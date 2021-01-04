FROM node:lts-alpine
WORKDIR /usr/src/app
COPY /dist ./
COPY /node_modules ./node_modules
COPY /LICENSE ./
EXPOSE 3000
CMD [ "node", "app.js" ]