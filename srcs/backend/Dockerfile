# Use an official Node.js image
FROM node:18 

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first (to take advantage of Docker's cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the backend port (e.g., 5000 for Express)
EXPOSE 5000

# Start the Express app
CMD ["npm", "run", "dev"]
# CMD ["sh", "./wait-for-it.sh", "db", "5432", "--", "npm", "run", "dev"]
