FROM node:lts-alpine3.16
WORKDIR /app
ENV NODE_ENV=production

COPY ./dist/apps/auth .

ENV PORT=3333
EXPOSE ${PORT}

RUN yarn install --production=true

CMD node ./main.js
