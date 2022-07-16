# Orders app run time environment
FROM node:lts-alpine3.16

# Create app directory
WORKDIR /app

ENV NODE_ENV=production

# Copy complete build context files to WORKDIR /app
COPY ./ ./

# Install dependencies before build
RUN yarn install

# Install missing dependencies at runtime in CI/CD pipeline
RUN yarn add @nrwl/node

# Build ts project for production and move it to apps/orders/dist
RUN yarn nx run orders:build-docker:production --verbose

# Install depedencies for server in production
RUN yarn --cwd apps/orders/dist install --production

# Start node server app in production environment
CMD node apps/orders/dist/main.js

# Server listener port
ENV PORT=3334
EXPOSE ${PORT}
