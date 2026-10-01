#!/usr/bin/env bash
# Atualiza os submodules dos sites filhos direto na main. Roda em duas etapas
# do workflow "Atualizar sites filhos":
#
#   prepare  acha os filhos cuja branch principal avançou e grava os ponteiros
#            novos na branch temporária bump/sites, de onde as imagens são construídas
#   publish  depois do build, aplica os ponteiros sobre a main atual, faz o push
#            e dispara o deploy
#
# Assim um site só entra na main se a imagem dele construiu.
# FILTER limita a um site (nome ou dono/repo); UPDATES vem da etapa prepare.
set -euo pipefail

STAGING=bump/sites
base=$(gh repo view --json defaultBranchRef --jq .defaultBranchRef.name)
git config user.name 'github-actions[bot]'
git config user.email '41898282+github-actions[bot]@users.noreply.github.com'

# Grava no índice o commit novo de cada site.
apply_updates() {
  jq -r '.[] | "\(.path) \(.latest)"' <<< "$1" | while read -r path latest; do
    git update-index --cacheinfo "160000,$latest,$path"
  done
}

commit_updates() {
  local summary details
  summary=$(jq -r '[.[] | "\(.name) para \(.latest[0:7])"] | join(", ")' <<< "$1")
  details=$(jq -r '.[] | "\(.name): \(.commit[0:7]) -> \(.latest[0:7])"
    + (if .repo then "\nhttps://github.com/\(.repo)/compare/\(.commit)...\(.latest)" else "" end)' <<< "$1")
  git commit -q -m "chore(sites): atualiza $summary" -m "$details"
}

prepare() {
  git checkout -q -B "$STAGING" "origin/$base"
  local found
  found=$(node deploy/sites.mjs outdated ${FILTER:+"$FILTER"})
  echo "updates=$found" >> "$GITHUB_OUTPUT"
  if [ "$found" = '[]' ]; then
    echo "sites=[]" >> "$GITHUB_OUTPUT"
    echo "Os sites filhos já estão no último commit."
    return
  fi

  apply_updates "$found"
  commit_updates "$found"
  git push -q --force origin "$STAGING"
  git log -1 --format=%B

  # Só os sites atualizados vão para o build, já com a tag da versão nova.
  local names
  names=$(jq -c '[.[].name]' <<< "$found")
  echo "sha=$(git rev-parse HEAD)" >> "$GITHUB_OUTPUT"
  echo "sites=$(node deploy/sites.mjs list | jq -c --argjson names "$names" '[.[] | select(.name as $n | $names | index($n))]')" >> "$GITHUB_OUTPUT"
}

publish() {
  : "${UPDATES:?UPDATES vem da etapa prepare}"
  local attempt
  for attempt in 1 2 3; do
    git fetch -q origin "$base"
    git checkout -q -B "$base" "origin/$base"
    apply_updates "$UPDATES"
    if git diff --cached --quiet; then
      echo "A $base já tem esses commits."
      break
    fi
    commit_updates "$UPDATES"
    if git push -q origin "$base"; then
      git log -1 --format=%B
      # Push feito com o GITHUB_TOKEN não dispara workflows: o deploy é chamado direto.
      gh workflow run deploy.yml --ref "$base"
      echo "Deploy disparado."
      break
    fi
    if [ "$attempt" = 3 ]; then
      echo "::error::A $base mudou durante o push três vezes seguidas."
      exit 1
    fi
    echo "A $base mudou durante o push; tentando de novo."
  done
  git push -q origin --delete "$STAGING" 2> /dev/null || true
}

case "${1:-}" in
  prepare) prepare ;;
  publish) publish ;;
  *) echo "uso: bump-sites.sh prepare | publish" >&2; exit 1 ;;
esac
