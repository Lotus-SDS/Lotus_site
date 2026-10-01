#!/usr/bin/env node
// Inventário dos sites publicados a partir deste repositório.
//
//   site principal  raiz do repo                 -> DOMAIN/
//   sites filhos    submodule em sites/<nome>    -> DOMAIN/<nome>/
//
// Os workflows em .github/workflows usam este script para decidir o que
// construir, gerar o compose de produção e abrir os PRs de atualização.
//
//   node deploy/sites.mjs list                       todos os sites (JSON)
//   node deploy/sites.mjs changed <base> <head>      sites afetados entre dois commits (JSON)
//   node deploy/sites.mjs compose                    compose de produção (YAML)
//   node deploy/sites.mjs verify <caminho>           falha se o submodule aponta para commit fora da branch principal do filho
//   node deploy/sites.mjs outdated [nome|dono/repo]  sites filhos cuja branch principal avançou (JSON)
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'

const DOMAIN = process.env.DOMAIN || 'lotusdev.com.br'
const IMAGE_PREFIX = (process.env.IMAGE_PREFIX || 'ghcr.io/lotus-sds/site-').toLowerCase()
const SITES_DIR = 'sites'
const STATIC_BUILDER = 'deploy/static'
// Caminhos que não entram na imagem do site principal: mudar só eles não gera imagem nova.
const MAIN_EXCLUDES = [SITES_DIR, 'deploy', 'templates', 'docs', '.github', '.impeccable', '.gitmodules', '*.md']
// O nome da pasta vira o caminho na URL (DOMAIN/<nome>/).
const NAME_RE = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/
// "main" é o site principal; "assets" é a saída do Vite dele; pastas de public/ também já são caminhos dele.
const isReserved = (name) => name === 'main' || name === 'assets' || existsSync(`public/${name}`)

const TRAEFIK_IMAGE = 'traefik:v3.6'
const NETWORK = 'web_network'
const RESOLVER = 'myresolver'

function git(args, { quiet = false } = {}) {
  return execFileSync('git', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', quiet ? 'ignore' : 'inherit'],
  }).trim()
}

function tryGit(args) {
  try {
    return git(args, { quiet: true })
  } catch {
    return ''
  }
}

function fail(message) {
  console.error(process.env.GITHUB_ACTIONS ? `::error::${message}` : message)
  process.exit(1)
}

function githubRepo(url) {
  return url.match(/github\.com[:/](.+?)(?:\.git)?\/?$/)?.[1] ?? null
}

// Branch padrão e commit mais recente de um remoto, sem precisar cloná-lo.
function remoteHead(remote, gitArgs = []) {
  const out = git([...gitArgs, 'ls-remote', '--symref', remote, 'HEAD'])
  return {
    branch: out.match(/^ref: refs\/heads\/(\S+)\s+HEAD$/m)?.[1] ?? null,
    sha: out.match(/^([0-9a-f]{40})\s+HEAD$/m)?.[1] ?? null,
  }
}

function mainSite() {
  if (git(['rev-parse', '--is-shallow-repository']) === 'true') {
    fail('Clone raso: a versão do site principal vem do histórico (use fetch-depth: 0 no checkout).')
  }
  const pathspec = ['.', ...MAIN_EXCLUDES.map((p) => `:(exclude)${p}`)]
  const sha = git(['log', '-1', '--format=%H', 'HEAD', '--', ...pathspec])
  return {
    name: 'main',
    path: '.',
    host: DOMAIN,
    prefix: '/',
    href: `https://${DOMAIN}/`,
    image: `${IMAGE_PREFIX}main`,
    tag: sha.slice(0, 12),
  }
}

function childSites() {
  const paths = tryGit(['config', '-f', '.gitmodules', '--get-regexp', '^submodule\\..*\\.path$'])
  if (!paths) return []
  // Sites sem Dockerfile próprio usam o build padrão: mudar esse build muda a imagem deles.
  const staticTree = git(['rev-parse', `HEAD:${STATIC_BUILDER}`]).slice(0, 7)

  return paths
    .split('\n')
    .map((line) => {
      const [key, path] = line.split(/\s+/)
      if (!path.startsWith(`${SITES_DIR}/`)) return null
      const id = key.slice('submodule.'.length, -'.path'.length)
      const conf = (k) => tryGit(['config', '-f', '.gitmodules', `submodule.${id}.${k}`])

      const name = path.slice(SITES_DIR.length + 1)
      if (!NAME_RE.test(name)) {
        fail(`"${path}": o nome da pasta vira o caminho /${name}/. Use só a-z, 0-9 e hífen, direto em ${SITES_DIR}/.`)
      }
      if (isReserved(name)) fail(`"${path}": /${name}/ já é usado pelo site principal. Escolha outro nome.`)
      const commit = tryGit(['rev-parse', `HEAD:${path}`])
      if (!commit) fail(`${path} está no .gitmodules mas não foi commitado como submodule.`)

      const url = conf('url')
      const repo = githubRepo(url)
      const branch = conf('branch')
      return {
        name,
        path,
        host: DOMAIN,
        prefix: `/${name}/`,
        href: `https://${DOMAIN}/${name}/`,
        repo,
        url: repo ? `https://github.com/${repo}.git` : url,
        branch: branch && branch !== '.' ? branch : null,
        commit,
        image: IMAGE_PREFIX + name,
        tag: `${commit.slice(0, 12)}-${staticTree}`,
      }
    })
    .filter(Boolean)
}

function sites() {
  return [mainSite(), ...childSites()]
}

function changed(base, head) {
  const files = git(['diff', '--name-only', `${base}...${head}`]).split('\n').filter(Boolean)
  const staticChanged = files.some((f) => f.startsWith(`${STATIC_BUILDER}/`))
  const isMainInput = (f) =>
    !MAIN_EXCLUDES.some((p) => (p.startsWith('*') ? f.endsWith(p.slice(1)) : f === p || f.startsWith(`${p}/`)))
  const mainChanged = files.some(isMainInput)
  return sites().filter((s) => (s.path === '.' ? mainChanged : staticChanged || files.includes(s.path)))
}

function compose() {
  const q = JSON.stringify
  const logging = ['    logging:', '      driver: json-file', '      options:', '        max-size: "10m"', '        max-file: "3"']
  const lines = [
    '# Gerado por deploy/sites.mjs no workflow de deploy. Não edite no servidor:',
    '# o próximo deploy sobrescreve este arquivo.',
    'name: lotus',
    'services:',
    '  traefik:',
    `    image: ${TRAEFIK_IMAGE}`,
    '    command:',
    ...[
      '--providers.docker=true',
      '--providers.docker.exposedbydefault=false',
      `--providers.docker.network=${NETWORK}`,
      '--entrypoints.web.address=:80',
      '--entrypoints.websecure.address=:443',
      '--entrypoints.web.http.redirections.entrypoint.to=websecure',
      '--entrypoints.web.http.redirections.entrypoint.scheme=https',
      `--certificatesresolvers.${RESOLVER}.acme.email=\${ACME_EMAIL:?Defina ACME_EMAIL no .env do servidor}`,
      `--certificatesresolvers.${RESOLVER}.acme.storage=/letsencrypt/acme.json`,
      `--certificatesresolvers.${RESOLVER}.acme.httpchallenge=true`,
      `--certificatesresolvers.${RESOLVER}.acme.httpchallenge.entrypoint=web`,
    ].map((arg) => `      - ${q(arg)}`),
    '    ports:',
    '      - "80:80"',
    '      - "443:443"',
    '    volumes:',
    '      - /var/run/docker.sock:/var/run/docker.sock:ro',
    '      - ./letsencrypt:/letsencrypt',
    '    restart: always',
    `    networks: [${NETWORK}]`,
    ...logging,
  ]

  for (const site of sites()) {
    const router = `traefik.http.routers.lotus-${site.name}`
    const host = `Host(\`${site.host}\`)`
    // O site principal fica com o domínio inteiro; cada filho, com /<nome>/. Regras mais
    // longas têm prioridade no Traefik, então os filhos vencem o principal.
    const rule = site.prefix === '/' ? host : `${host} && (Path(\`/${site.name}\`) || PathPrefix(\`${site.prefix}\`))`
    lines.push(
      `  site-${site.name}:`,
      `    image: ${q(`${site.image}:${site.tag}`)}`,
      '    restart: always',
      `    networks: [${NETWORK}]`,
      // A imagem deve expor uma única porta (EXPOSE): o Traefik a descobre sozinho.
      '    labels:',
      '      traefik.enable: "true"',
      `      ${router}.rule: ${q(rule)}`,
      `      ${router}.entrypoints: websecure`,
      `      ${router}.tls.certresolver: ${RESOLVER}`,
    )
    if (site.prefix !== '/') {
      // /<nome> vira /<nome>/, senão os links relativos do site apontam para a raiz.
      // O prefixo não é cortado: o container recebe /<nome>/... ($$ é o $ literal no compose).
      const middleware = `traefik.http.middlewares.lotus-${site.name}-slash.redirectregex`
      lines.push(
        `      ${router}.middlewares: lotus-${site.name}-slash`,
        `      ${middleware}.regex: ${q(`^(https?://[^/]+/${site.name})(\\?.*)?$$`)}`,
        `      ${middleware}.replacement: ${q('$${1}/$${2}')}`,
        `      ${middleware}.permanent: "true"`,
      )
    }
    lines.push(...logging)
  }

  lines.push('networks:', `  ${NETWORK}:`, '    external: true')
  return lines.join('\n') + '\n'
}

function verify(path) {
  const site = childSites().find((s) => s.path === path.replace(/\/+$/, ''))
  if (!site) fail(`${path} não é um site filho (submodule em ${SITES_DIR}/).`)
  const sub = ['-C', site.path]

  const branch = site.branch || remoteHead('origin', sub).branch
  if (git([...sub, 'rev-parse', '--is-shallow-repository']) === 'true') {
    git([...sub, 'fetch', '--quiet', '--unshallow', 'origin'])
  }
  git([...sub, 'fetch', '--quiet', 'origin', `+refs/heads/${branch}:refs/remotes/origin/${branch}`])
  try {
    git([...sub, 'merge-base', '--is-ancestor', site.commit, `refs/remotes/origin/${branch}`], { quiet: true })
  } catch {
    fail(
      `${site.path} aponta para ${site.commit.slice(0, 7)}, que não está na branch ${branch} de ${site.repo ?? site.url}. ` +
        'Só vai para produção o que já passou pelo PR do repositório do site.',
    )
  }
  console.log(`${site.path}: ${site.commit.slice(0, 7)} está em ${branch}.`)
}

function outdated(filter) {
  let children = childSites()
  if (filter) {
    children = children.filter((s) => s.name === filter || s.repo?.toLowerCase() === filter.toLowerCase())
    if (!children.length) fail(`Nenhum site filho corresponde a "${filter}".`)
  }
  return children.flatMap((site) => {
    let { branch } = site
    let latest
    if (branch) latest = git(['ls-remote', site.url, `refs/heads/${branch}`]).split(/\s/)[0]
    else ({ branch, sha: latest } = remoteHead(site.url))
    if (!latest) fail(`Não consegui ler a branch ${branch ?? 'principal'} de ${site.url}.`)
    return latest === site.commit ? [] : [{ ...site, branch, latest }]
  })
}

const [command, ...args] = process.argv.slice(2)
switch (command) {
  case 'list':
    console.log(JSON.stringify(sites()))
    break
  case 'changed':
    if (args.length !== 2) fail('uso: sites.mjs changed <base> <head>')
    console.log(JSON.stringify(changed(...args)))
    break
  case 'compose':
    process.stdout.write(compose())
    break
  case 'verify':
    if (args.length !== 1) fail('uso: sites.mjs verify <caminho>')
    verify(args[0])
    break
  case 'outdated':
    console.log(JSON.stringify(outdated(args[0])))
    break
  default:
    fail('uso: sites.mjs list | changed <base> <head> | compose | verify <caminho> | outdated [nome|dono/repo]')
}
