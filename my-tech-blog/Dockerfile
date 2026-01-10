# Dockerfile
FROM node:20.9.0

# Create app directory
WORKDIR /usr/src/app/my-tech-blog

# Copy package.json package-lock.json
COPY ./package*.json .

RUN ["npm", "install"]
# RUN ["npm", "run", "build"]