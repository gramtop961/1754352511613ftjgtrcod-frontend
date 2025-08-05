# You can use most Debian-based base images
FROM node:21-slim

# Install curl
RUN apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY compile_frontend.sh /compile_frontend.sh
RUN chmod +x /compile_frontend.sh

# Set working directory
WORKDIR /home/user

# Copy the frontend application files (including node_modules)
COPY . .

# Install dependencies
RUN npm install

# Build the Next.js application
RUN npm run build 