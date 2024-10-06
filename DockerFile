# Use the official Node.js image
FROM node:18

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code to the container image
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Set environment variables
ENV DB_HOST=${DB_HOST}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV JWT_SECRET=${JWT_SECRET}

# Run the web service on container startup
CMD [ "node", "src/app.js" ]
