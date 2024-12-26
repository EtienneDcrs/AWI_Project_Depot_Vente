FROM node:lts as backend
WORKDIR /app/backend
COPY package*.json ./
RUN npm install
COPY ./ .

CMD ["node", "server.js"]