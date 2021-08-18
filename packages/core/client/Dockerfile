FROM node:14-alpine

ENV PATH /app/node_modules/.bin:$PATH
ADD package.json /app/package.json
WORKDIR /app
RUN npm install
COPY . /app

CMD ["npm", "run", "dev"]
