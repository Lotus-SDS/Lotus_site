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
# Copia nossa configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]