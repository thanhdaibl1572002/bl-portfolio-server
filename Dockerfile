FROM node:lts-alpine

RUN apk update && apk add bash

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "./dist/index.js" ]