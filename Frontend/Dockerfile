# Use the current node image as base
FROM node:21-alpine

# Create an application directory
RUN mkdir -p /app

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Install node packages
RUN npm install

COPY . .

# Build the app
RUN npm run build

# Expose port 3000 on container
EXPOSE 3000

# Start the app
CMD ["npm", "run", "production"]