# Use an official node.js runtime as a parent image 
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*json .             

# Install the dependencies
RUN npm install 

# Copy the rest of the files to the main directory in the container
COPY . .

# Expose the port which the server is running on
EXPOSE 5757

# Commands to run the app
CMD [ "node","./src/server.js" ]