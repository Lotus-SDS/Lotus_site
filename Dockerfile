# Etapa 1: Construção (Build)
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servidor Web (Nginx) - Mantém o site online
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Configuração para não dar erro 404 ao atualizar a página
RUN echo 'server { \
    listen 80; \
    server_name 72.61.62.222 localhost; \
    location / { \
    root /usr/share/nginx/html; \
    index index.html index.htm; \
    try_files $uri $uri/ /index.html; \
    } \
    }' > /etc/nginx/conf.d/default.conf
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]