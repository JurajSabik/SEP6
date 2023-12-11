FROM nginx:1.21.1-alpine

WORKDIR /usr/share/nginx/html

COPY ./dist/movies-sep6 .

EXPOSE 80

# # Use Node 20 Alpine as the base image for the build stage
# FROM node:20-alpine AS build

# # Install Chromium for Karma tests
# RUN apk add chromium
# ENV CHROME_BIN=/usr/bin/chromium-browser

# # Set the working directory inside the container
# WORKDIR /app

# # Copy the package.json and package-lock.json files to the working directory
# COPY package*.json ./

# # Install the project dependencies
# RUN npm install

# # Copy the rest of the project files to the working directory
# COPY . .

# # Run tests
# #RUN ./node_modules/.bin/ng test --no-watch --no-progress --browsers=ChromeHeadlessCI 

# # Build the Angular project
# RUN ./node_modules/.bin/ng build 

# # Uncomment the following lines to run client in container

# # # Use NGINX as the base image for the serve stage
# FROM nginx:1.21.1-alpine AS serve

# # # Copy the built Angular app from the build stage to the NGINX default public directory
# COPY --from=build /app/dist/movies-sep6 /usr/share/nginx/html

# # # Expose the default NGINX port
# #EXPOSE 80

# # # Start NGINX
# #CMD ["nginx", "-g", "daemon off;"]
