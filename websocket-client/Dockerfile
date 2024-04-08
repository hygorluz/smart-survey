# Stage 1: Build the Angular application
FROM node:16 as build

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Angular app
RUN npm run build

# Stage 2: Serve the Angular application using Nginx
FROM nginx:alpine

# Copy the built Angular app from the build stage to Nginx's HTML directory
COPY --from=build /app/dist/survey-ng /usr/share/nginx/html

# Expose port 80 for serving the application
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
