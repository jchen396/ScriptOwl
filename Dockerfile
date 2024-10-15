FROM node:18-slim

COPY ./server /server

COPY ./types /types

WORKDIR server

RUN apt-get update 

RUN apt-get install -y ffmpeg

RUN apt-get install -y python3-pip 

RUN pip install -r requirements.txt --upgrade --break-system-packages

RUN apt-get install -y python-is-python3 \
    && npm install

EXPOSE 5000
