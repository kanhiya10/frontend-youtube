# ---------- Stage 1: Build Frontend ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy frontend source code
COPY . .
RUN npm run build


# ---------- Stage 2: Nginx + RTMP ----------
FROM tiangolo/nginx-rtmp

# Copy your Nginx config
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy built frontend acinto Nginx's web root
COPY --from=builder /app/dist /www
