FROM node:12.22-buster-slim AS base

WORKDIR /web-app
COPY . .
RUN npm ci


FROM base as dev
RUN npm install --only=development \
  && npm cache clean --force


FROM base as build
RUN npm run build


FROM nginx:1.17 as prod
COPY --from=build /web-app/public /usr/share/nginx/html
