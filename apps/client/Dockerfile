FROM node:lts-alpine3.16
WORKDIR /app
COPY ./dist/apps/client .
ENV PORT=4200
EXPOSE ${PORT}
RUN npm install --production
#CMD nx run client:serve:production
CMD nx serve client --prod
