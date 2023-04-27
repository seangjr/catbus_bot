# Use the official Node.js 16 image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies in the container
RUN npm install --production

# Copy the rest of the files to the container
COPY . .

# Expose the port that the bot will listen on
EXPOSE 3000

# Start the bot in the container
CMD ["npm", "start"]