# Base image
FROM node:18-alpine

# Set work directory
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy backend source
COPY . .

# Expose backend port
EXPOSE 5000

# Start backend
CMD ["npm", "start"]
