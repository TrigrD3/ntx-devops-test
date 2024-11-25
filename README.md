# DevOps Engineer - Technical Test

## CI/CD Pipelines

### Overview

This repository includes **two CI pipelines** defined in **GitHub Actions**:

1. **Development Pipeline (`ci-deploy-dev.yaml`)**  
   This pipeline builds, pushes, and deploys the application to a development environment.
   - **Job 1: `build-node-app`**
     - Builds the Node.js Docker image (`latest` tag).
     - Pushes the image to DockerHub.
   - **Job 2: `build-nginx`**
     - Builds the NGINX Docker image for development (`dev` tag).
     - Pushes the image to DockerHub.
   - **Job 3: `build-nginx-compose`**
     - Builds the NGINX Docker image for Docker Compose (`latest` tag).
     - Pushes the image to DockerHub.
   - **Job 4: `deploy`**
     - Configures `kubectl` to use the Docker Desktop context.
     - Applies the Kubernetes deployment manifest (`kubernetes/deployment-dev.yaml`).
     - Restarts the deployments to pick up new changes and verify successful rollout.

2. **Production Pipeline (`ci-deploy-prod.yaml`)**  
   This pipeline performs similar steps as the development pipeline but uses production-specific configurations.

---

## Deployment Options

The application can be deployed using either **Docker Compose** or **Kubernetes deployments**.

### 1. **Docker Compose**
   - The `docker-compose.yaml` file orchestrates the application along with the NGINX load balancer.
   - To run the application using Docker Compose:
     ```bash
     docker compose up --build
     ```
   - NGINX will load balance requests across the application instances, which can be accessed on port `80`.

### 2. **Kubernetes Deployments**
   - The `kubernetes/` directory contains the manifests for deploying the application in a Kubernetes cluster.
   - You can apply the deployment manifests using:
     ```bash
     kubectl apply -f kubernetes/deployment-dev.yaml  # For development
     kubectl apply -f kubernetes/deployment-prod.yaml # For production
     ```
   - The Kubernetes configuration creates a deployment with the Node.js application and NGINX as the reverse proxy.

---

## Running the Web Application

### 1. **Kubernetes Deployment**
   After deployment with Kubernetes, the application will respond with:
   
   Hi there! I’m being served from {hostname}!

   - You can verify this response by using `curl` or visiting the endpoint in a browser.
     ```bash
     http://localhost:8080/  # For development(feature-*)   
     http://localhost:80/  # For production(main)
     ```

### 2. **Docker Compose Deployment**
   After deployment with Docker Compose, the application will also respond with:
   
   Hi there! I’m being served from {hostname}!

   - In this case, you can verify the response by accessing the application on:
     ```bash
     http://localhost:80/  # For both development and production (as Docker Compose uses a single port)
     ```
---

## Tools and Technologies Used

- **CI/CD Pipelines**: GitHub Actions for automating build, push, and deploy processes.
- **Containerization**: Docker for containerizing the Node.js application and NGINX.
- **Orchestration**: Docker Compose, Kubernetes for application deployment and management.
- **Self-Hosted Runners**: GitHub Actions self-hosted runners are used to execute the pipeline jobs.

---

## Notes

- The **CI pipelines** are triggered automatically on pushes to branches with the prefix `feature-*` or to `main`.
- Each pipeline builds and pushes Docker images for the Node.js app and NGINX (with different tags for development and production).
- Kubernetes deployments can be managed using `kubectl` commands for both environments.
