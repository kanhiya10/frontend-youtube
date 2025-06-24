FROM node:22.15.0

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps && npm rebuild

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
# Use official Node.js LTS image
FROM node:22.15.0

# Set working directory inside container
WORKDIR /app

# Copy only package.json and package-lock.json for dependency installation
COPY package*.json ./

# OPTIONAL: Remove Windows-generated lockfile to avoid OS conflicts
RUN rm -f package-lock.json

# Re-generate lockfile inside the Linux container
RUN npm install --legacy-peer-deps --package-lock-only \
 && npm install --legacy-peer-deps \
 && npm rebuild

# Now copy the rest of the application
COPY . .

# Ignore Windows line endings if needed (optional safety)
RUN find . -type f -exec dos2unix {} + || true

# Expose desired port
EXPOSE 8080

# Run development server
CMD ["npm", "run", "dev"]
