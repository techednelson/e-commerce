#!/bin/zsh

# Import variables from .env.prod file
set -o allexport
source .env set
+o allexport

# Build only changed apps
yarn env-cmd -f .env.prod run build-all:affected

# Switch always to local kubernetes context to avoid mistakes with kubernetes cluster in production
Kubectl config use-context docker-desktop

# start minikube local kubernetes cluster
minikube start

# connect to docker env inside minikube
minikube docker-env

# shellcheck disable=SC2046
eval $(minikube -p minikube docker-env)

# Build auth service docker image
docker build -f apps/auth/Dockerfile . -t "$DOCKER_USERNAME"/auth

# Build client service docker image
docker build -f apps/client/Dockerfile . -t "$DOCKER_USERNAME"/client

# Deploy auth-mongo service container to pod in kubernetes cluster
kubectl apply -f infra/k8s/auth-mongo-deployment.yml

# Deploy auth-mongo service container to pod in kubernetes cluster
kubectl apply -f infra/k8s-dev/auth-deployment.yml

# Deploy client service container to pod in kubernetes cluster
kubectl apply -f infra/k8s-dev/client-deployment.yml

# Deploy ingress-controller service to pod in kubernetes cluster
kubectl apply -f infra/k8s-dev/ingress-service.yml
