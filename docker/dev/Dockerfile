FROM node:slim

RUN mkdir /salic-ml-frontend/
WORKDIR /salic-ml-frontend/

RUN apt-get update

COPY . /salic-ml-frontend/

RUN npm install

expose 8080

CMD ["npm", "run", "serve"]
