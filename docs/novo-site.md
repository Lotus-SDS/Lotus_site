# Novo site filho: passo a passo

Guia para publicar um site novo em `lotusdev.com.br/<nome>/` partindo do repositório [Lotus-SDS/template-site](https://github.com/Lotus-SDS/template-site). Para entender a arquitetura por trás, veja [ci-cd.md](ci-cd.md).

O exemplo usa um site fictício, **padaria-sol**. Troque pelo nome real em todos os comandos.

| | Exemplo |
|---|---|
| Nome do site (pasta e endereço) | `padaria-sol` → `https://lotusdev.com.br/padaria-sol/` |
| Repositório | `Lotus-SDS/padaria-sol` |

O nome do site usa só `a-z`, `0-9` e hífen, e não pode ser `main`, `assets` nem `images`.

Legenda: **[GitHub]** é no navegador; **[PC]** é no terminal (WSL).

---

## 0. Uma vez só: marcar o template-site como template [GitHub]

Sem isso, o botão **Use this template** não aparece.

1. github.com/Lotus-SDS/template-site → **Settings** → **General**.
2. Logo abaixo do nome do repositório, marque **Template repository**.

Pule este passo se o botão verde **Use this template** já aparece na página do template-site.

## 1. Criar o repositório do site [GitHub]

1. github.com/Lotus-SDS/template-site → **Use this template** → **Create a new repository**.
2. **Owner:** Lotus-SDS. **Repository name:** `padaria-sol`. **Public** ou **Private**.
3. Deixe **Include all branches** desmarcado e clique em **Create repository**.

O repositório novo já vem com:

| Arquivo | Para que serve |
|---|---|
| `.github/workflows/lotus.yml` | Valida o build e avisa o Lotus_site a cada push na `main`. |
| `.dockerignore` | Tira da imagem o que não é site (`.impeccable`, `video`, os `.md`…). |
| `README.md` | Descrição do repositório: troque pelo do site. |

Se aparecer um run **Lotus** ❌ com "Sem package.json, Dockerfile nem index.html", é normal: o template ainda não tem site. O próximo push resolve.

## 2. Só se o repositório for privado: tokens [GitHub]

Repositório **público**: pule para o passo 3, porque o secret da organização já chega até ele.

Repositório **privado**, faça as duas coisas antes do primeiro push:

1. **Secret do aviso.** Em github.com/Lotus-SDS/padaria-sol → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**: Name `LOTUS_BOT_TOKEN`, Secret = o token **lotus-bot-aviso**. No plano gratuito, o secret da organização não chega a repositórios privados.
2. **Acesso do Lotus_site.** Na sua conta → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **lotus-bot-site** → **Edit** → **Repository access** → acrescente `padaria-sol` → **Update**. Sem isso, o Lotus_site não consegue clonar o site e o deploy falha.

## 3. Colocar o site no repositório [PC]

```bash
git clone git@github.com:Lotus-SDS/padaria-sol.git ~/sites/padaria-sol
cd ~/sites/padaria-sol
```

Copie para essa pasta os arquivos do site: `index.html`, `css/`, `js/`, `assets/`... Antes do commit, três conferências:

**a) Links relativos.** O site roda dentro de `/padaria-sol/`, e um caminho começando com `/` aponta para o site principal da Lotus.

```bash
grep -rnoE '(src|href)="/[^/"][^"]*"' --include=*.html .
```

Não deve aparecer nada. Use `css/style.css`, e não `/css/style.css`.

**b) URLs de compartilhamento absolutas**, no `<head>` do `index.html`. Sem elas, a prévia do link sai em branco no WhatsApp:

```html
<link rel="canonical" href="https://lotusdev.com.br/padaria-sol/">
<meta property="og:url" content="https://lotusdev.com.br/padaria-sol/">
<meta property="og:image" content="https://lotusdev.com.br/padaria-sol/assets/capa.jpg">
```

**c) Pastas de trabalho fora do ar.** Gravações, rascunhos e scripts que não fazem parte da página vão no `.dockerignore`, uma pasta por linha.

Projetos com `package.json` (Vite, por exemplo) também funcionam: o Lotus_site roda `npm run build` e publica `dist/`. Para os links gerados ficarem certos, use `base: process.env.BASE_PATH ?? '/'` no `vite.config.js`.

## 4. Primeiro push do site [PC]

```bash
git add .
git commit -m "feat: primeira versão do site"
git push
```

Conferindo [GitHub]:
- **Em padaria-sol → Actions → Lotus:** ✅ nos dois jobs.
- **Em Lotus_site → Actions:** vai aparecer **Atualizar sites filhos** ❌ com "Nenhum site filho corresponde a Lotus-SDS/padaria-sol". **Esperado:** o site avisou, mas o Lotus_site ainda não o conhece. O passo 5 resolve.

## 5. Registrar o site no Lotus_site [PC]

O site só passa a existir para o Lotus_site quando o submodule chega **na `main`**. Numa branch, nada acontece.

```bash
cd ~/Lotus_site
git switch main
git pull
```

O `pull` traz os commits que o bot faz sozinho na `main`.

```bash
git submodule add https://github.com/Lotus-SDS/padaria-sol.git sites/padaria-sol
```

A URL é `https://`, mesmo com SSH no resto: é ela que fica registrada, e o GitHub Actions clona por HTTPS. Se o repositório for privado e o comando pedir usuário e senha, use:

```bash
git -c url."git@github.com:".insteadOf="https://github.com/" submodule add https://github.com/Lotus-SDS/padaria-sol.git sites/padaria-sol
```

Depois:

```bash
git commit -m "add: site padaria-sol"
node deploy/sites.mjs list | jq -r '.[].href'
```

A lista deve mostrar `https://lotusdev.com.br/padaria-sol/` junto dos outros sites. Se aparecer um erro de nome, **não faça o push**: corrija o nome antes.

```bash
git push origin main
```

Esse push dispara o deploy.

## 6. Conferir o deploy [GitHub]

Lotus_site → **Actions** → **Deploy**:

| Job | Esperado |
|---|---|
| Planejar | ✅ |
| Build / padaria-sol | ✅ Só o site novo é construído. |
| Publicar no servidor | ✅ Termina conferindo os sites no ar. |

No navegador: **https://lotusdev.com.br/padaria-sol/**

Pronto: o site está publicado.

---

## Dia a dia: atualizar o site

O Lotus_site não precisa de mais nada. É só fazer push na `main` do site:

```bash
cd ~/sites/padaria-sol
git add .
git commit -m "fix: corrige telefone"
git push
```

Em poucos minutos a mudança está no ar:
1. **Lotus** roda, no repositório do site.
2. **Atualizar sites filhos** roda no Lotus_site e faz um commit `chore(sites): atualiza padaria-sol…` na `main`.
3. **Deploy** publica.

A pasta `~/Lotus_site/sites/padaria-sol` também é um clone do mesmo repositório: tanto faz trabalhar nela ou em `~/sites/padaria-sol`. Antes de trabalhar no Lotus_site, rode `git pull` para trazer os commits do bot.

## Se algo der errado

| Sintoma | Causa provável | Passo |
|---|---|---|
| "Nenhum site filho corresponde" **depois** do passo 5 | O submodule não chegou na `main` (ficou numa branch). | 5 |
| "Sem LOTUS_BOT_TOKEN" no job "Avisar Lotus_site" | Repositório privado sem o secret. | 2 |
| Build falha no checkout ("repository not found", "could not read Username") | Repositório privado fora do token lotus-bot-site. | 2 |
| Site abre sem CSS ou sem imagens | Links absolutos (`/css/...`). | 3a |
| Prévia em branco no WhatsApp | `og:image` relativo. | 3b |
| Erro de nome no job Planejar do Deploy | Nome inválido ou reservado. Os outros sites continuam no ar. | 5 |
| O botão "Use this template" não aparece | O template-site não está marcado como template. | 0 |
