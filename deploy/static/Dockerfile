# syntax=docker/dockerfile:1
# Imagem padrão dos sites filhos que não têm Dockerfile próprio.
#   - com script "build" no package.json: npm ci + npm run build, serve dist/, build/ ou out/
#   - sem isso: serve os arquivos do repositório como estão (HTML/CSS/JS puro)
# O site é servido em BASE_PATH (/<nome>/), que também fica disponível para o "npm run build".
# O contexto do build é a pasta do site; o nginx.conf vem do contexto nomeado "lotus-static":
#   docker buildx build --build-context lotus-static=deploy/static -f deploy/static/Dockerfile \
#     --build-arg BASE_PATH=/<nome>/ sites/<nome>

FROM node:22-alpine AS build
ARG BASE_PATH=/
WORKDIR /src
COPY . .
RUN set -eu; \
    case "$BASE_PATH" in /|/*/) ;; *) echo "BASE_PATH precisa começar e terminar com /: $BASE_PATH" >&2; exit 1 ;; esac; \
    rm -rf .git .github; \
    if [ -f package.json ] && node -e "process.exit(require('./package.json').scripts?.build ? 0 : 1)"; then \
      if [ -f package-lock.json ]; then npm ci; else npm install; fi; \
      npm run build; \
      out=""; \
      for dir in dist build out; do if [ -d "$dir" ]; then out="$dir"; break; fi; done; \
      if [ -z "$out" ]; then echo "npm run build não gerou dist/, build/ nem out/" >&2; exit 1; fi; \
      mv "$out" /out; \
    else \
      mkdir /out && cp -a . /out/; \
    fi

FROM nginx:alpine
ARG BASE_PATH=/
RUN rm -f /usr/share/nginx/html/*.html
COPY --from=lotus-static nginx.conf /etc/nginx/conf.d/default.conf
RUN sed -i "s#__BASE_PATH__#${BASE_PATH}#g" /etc/nginx/conf.d/default.conf
COPY --from=build /out /usr/share/nginx/html${BASE_PATH}
