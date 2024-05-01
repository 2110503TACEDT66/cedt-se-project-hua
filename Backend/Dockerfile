# Use an official Node.js runtime as the base image
FROM node:21-alpine

# Set NODE_ENV to production
ENV NODE_ENV=production

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install --production

# Copy the rest of the backend source code to the working directory
COPY . .

# Make port 5001 available to the world outside this container
EXPOSE 5001

# Run the application when the container launches
CMD ["npm", "start"]