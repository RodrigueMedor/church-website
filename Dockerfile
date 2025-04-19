# Use the official Node.js image as the base image
FROM node:22.12.0-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Set the command to run the HTTP server on the build output
CMD ["serve", "-s", "build", "-l", "8080"]

# Expose the port the app runs on
EXPOSE 8080
