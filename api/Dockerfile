FROM node:12.22-buster-slim AS base

WORKDIR /api
COPY package*.json ./
RUN npm install --only=production \
  && npm cache clean --force


FROM base AS dev
RUN npm install --only=development \
  && npm cache clean --force


FROM dev as build
COPY . .


FROM base AS prod
COPY --from=build /api/dist/ .
CMD [ "node", "./src/app.js" ]

