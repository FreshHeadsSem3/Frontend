# Stage 1: Build the Angular application
FROM node:latest as build

#set working directory
WORKDIR /app

COPY ./FreshHeadFrontend/package*.json ./FreshHeadFrontend/package-lock.json ./

RUN npm ci

COPY ./FreshHeadFrontend .

RUN npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/fresh-head-frontend /usr/share/nginx/html

# Expose port 80 and 443
EXPOSE 80

# Default command to start NGINX and serve the application
CMD ["nginx", "-g", "daemon off;"]