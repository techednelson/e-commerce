FROM node:lts-alpine3.16
WORKDIR /app

ENV NODE_ENV=production

COPY ./dist/apps/client .

COPY ./dist/apps/client/.next ./.next

ENV PORT=4200
EXPOSE ${PORT}

RUN yarn install --production=true

RUN yarn add @nrwl/next

CMD yarn next start
