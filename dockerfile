FROM node:16
WORKDIR /usr/src/helpdesk
COPY ./package.json .
COPY .env .
RUN npm install
COPY ./dist ./dist
EXPOSE  3500
CMD npm start
