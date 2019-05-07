FROM node:10-alpine

RUN mkdir /usr/salic-ml-frontend

WORKDIR /usr/salic-ml-frontend

COPY ./package*.json ./

RUN npm install && npm run build
