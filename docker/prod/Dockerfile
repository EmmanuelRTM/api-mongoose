FROM node:12-slim

WORKDIR /usr/src/app 

COPY package.json package-lock.json ./

RUN npm ci --production && npm cache clean --force

COPY . .

#ARG PORT

#ENV PORT=$PORT

ENV NODE_ENV production

CMD ["node","server.js"]