FROM node:18

COPY ./server /server

COPY ./types /types

WORKDIR server

RUN npm install

EXPOSE 5000

CMD ["ls"]