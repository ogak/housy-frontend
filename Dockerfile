FROM node:dubnium-alpine

WORKDIR /housy-frontend
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 3000
CMD [ "npm","run-script","start" ]
