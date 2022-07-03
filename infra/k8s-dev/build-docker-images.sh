#!/bin/zsh
set -o allexport
source .env set
+o allexport

Kubectl config use-context docker-desktop

minikube start

minikube docker-env

# shellcheck disable=SC2046
eval $(minikube -p minikube docker-env)

docker build -f apps/auth/Dockerfile . -t "$DOCKER_USERNAME"/auth
docker build -f apps/client/Dockerfile . -t "$DOCKER_USERNAME"/client

kubectl apply -f infra/k8s/auth-mongo-deployment.yml


kubectl apply -f infra/k8s-dev/auth-deployment.yml
kubectl apply -f infra/k8s-dev/client-deployment.yml

kubectl apply -f infra/k8s-dev/ingress-service.yml
