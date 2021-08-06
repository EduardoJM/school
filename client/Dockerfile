FROM node:13 as build

ENV PATH /app/node_modules/.bin:$PATH
ADD package.json /app/package.json
WORKDIR /app
RUN npm install
RUN npm install react-scripts@3.3.1 -g
COPY . /app

CMD ["npm", "start"]
