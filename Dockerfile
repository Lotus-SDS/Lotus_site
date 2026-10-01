# Imagem do site principal (lotusdev.com.br). Os sites filhos usam deploy/static/Dockerfile.

# Etapa 1: Build do Node (Gera a pasta dist)
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: Servidor Nginx (Serve os arquivos)
FROM nginx:alpine
# Pega o que foi construído na etapa 1 e joga no Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Copia nossa configuração limpa (sem SSL: o Traefik termina o HTTPS)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
