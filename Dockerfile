FROM node:lts
WORKDIR /usr/src/app
COPY /dist ./
COPY /node_modules ./
COPY /LICENSE ./
EXPOSE 3000
RUN ls -l ./ && ls -l ./node_modules && ls -l ./dist
CMD [ "node", "app.js" ]