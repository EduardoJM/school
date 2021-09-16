FROM node:alpine

WORKDIR "/app"

RUN yarn global add typescript

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY ./src ./src

RUN yarn build
