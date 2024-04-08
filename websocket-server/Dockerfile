# ---- Production image ----
FROM node:lts-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install production dependencies only
RUN npm install

# Copy built application from the build stage
COPY . .

RUN npm run build

# Expose port 80 for HTTP traffic
EXPOSE 10000

# Command to start the server on port 80
CMD ["node", "./dist/server.js"]