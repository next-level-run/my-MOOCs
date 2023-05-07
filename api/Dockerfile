FROM node:12.22-buster-slim AS base
WORKDIR /api
COPY package*.json ./
RUN npm ci
COPY . .


FROM base AS dev
RUN npm install --only=development \
  && npm cache clean --force


FROM base as build
COPY . /home/node/api
WORKDIR /home/node/api
USER node


FROM build AS prod
CMD [ "node", "./src/app.js" ]
