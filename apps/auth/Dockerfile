FROM node:lts-alpine3.16
WORKDIR /app
COPY ./dist/apps/auth .
ENV PORT=3333
EXPOSE ${PORT}
RUN npm install --production
CMD node ./main.js
