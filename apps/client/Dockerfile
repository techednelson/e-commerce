# Client app run time environment
FROM node:lts-alpine3.16

# Create app directory
WORKDIR /app

ENV NODE_ENV=production

# Copy complete build context files to WORKDIR /app
COPY ./ ./

# Install dependencies before build
RUN yarn install

# Install missing dependency at runtime in CI/CD pipeline
#RUN yarn add -D  @types/jest
#RUN yarn add @nrwl/next

# Build ts project for production and move it to apps/client/dist
RUN yarn nx run client:build-docker:production --verbose

# Install depedencies for server in production
RUN yarn --cwd apps/client/dist install --production

# Start node server app in production environment
CMD yarn --cwd apps/client/dist run start

# Server listener port in production
ENV PORT=4200
EXPOSE ${PORT}




