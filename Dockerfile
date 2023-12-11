FROM node:lts-alpine

# Setting up the work directory
WORKDIR /client

# Installing dependencies
COPY . .
RUN npm install  --silent && mv node_modules ../
# Starting our application
CMD ["npm","start"]

# docker build -t node-AI .
# docker run -p 3000:3000 node-AI