FROM node:14.18.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG DEFAULT_PORT=80

ENV PORT $DEFAULT_PORT

EXPOSE $PORT

CMD ["node", "app.js"]