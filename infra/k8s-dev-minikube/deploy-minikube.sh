#!/bin/bash

# Import variables from .env.prod file
set -o allexport
source .env set
+o allexport

# Switch always to local kubernetes context to avoid mistakes with kubernetes cluster in production
Kubectl config use-context docker-desktop

# Deletes local Kubernetes cluster. This command deletes the VM, and removes all associated files.
minikube delete

# start minikube local kubernetes cluster
minikube start

# connect to docker env inside minikube
minikube docker-env

# shellcheck disable=SC2046
eval $(minikube -p minikube docker-env)

# Build auth service docker image
docker build -f apps/auth/Dockerfile . -t "$DOCKER_USERNAME"/auth

# Build orders service docker image
docker build -f apps/orders/Dockerfile . -t "$DOCKER_USERNAME"/orders

# Build client service docker image
docker build -f apps/client/Dockerfile . -t "$DOCKER_USERNAME"/client

# Deploy auth-mongo service container to pod in kubernetes cluster
kubectl apply -f infra/k8s/auth-mongo-deployment.yml

# Deploy auth-mongo service container to pod in kubernetes cluster
kubectl apply -f infra/k8s-dev-minikube/auth-deployment.yml

# Deploy orders-mongo service container to pod in kubernetes cluster
kubectl apply -f infra/k8s/orders-mongo-deployment.yml

# Deploy orders-mongo service container to pod in kubernetes cluster
kubectl apply -f infra/k8s-dev-minikube/orders-deployment.yml

# Deploy client service container to pod in kubernetes cluster
kubectl apply -f infra/k8s-dev-minikube/client-deployment.yml

# Deploy ingress-controller service to pod in kubernetes cluster
kubectl apply -f infra/k8s-dev-minikube/ingress-service.yml

# create secrets inside k8s
sh infra/kubernetes/create-secrets.sh
