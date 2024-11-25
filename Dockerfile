FROM node:18-alpine

WORKDIR /app 

COPY package*.json ./

COPY . .

ARG APP_PORT
ARG ENV_FILE

COPY ${ENV_FILE} .env

RUN yarn install

EXPOSE ${APP_PORT}

CMD ["node", "app.js"]