FROM node:latest
RUN npm install -g npm@10.7.0
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . ./
EXPOSE 8080
CMD ["npm", "run", "start"]