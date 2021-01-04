FROM node:lts
WORKDIR /usr/src/app
COPY /drone/src/dist ./
COPY /drone/src/node_modules ./
COPY /drone/src/LICENSE ./
EXPOSE 3000
CMD [ "node", "app.js" ]