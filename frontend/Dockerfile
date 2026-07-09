# Atribui o nome build à primiera etapa (primeiro from)
FROM node:24 as build
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Nginx já possui um CMD padrão