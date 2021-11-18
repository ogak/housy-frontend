FROM node:10.24.1-alpine3.11

WORKDIR /housy-frontend
COPY package*.json ./

RUN npm install
RUN npm i serve -g
COPY . .

RUN npm run-script build

EXPOSE 3000
CMD [ "serve","-s","build" ]
