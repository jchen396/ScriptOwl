FROM node:20-slim

WORKDIR /server

COPY ./server/package*.json ./
COPY ./server/requirements.txt ./

RUN apt-get update && apt-get install -y \
    ffmpeg \
    python3-pip \
    python-is-python3 \
    portaudio19-dev \
    && rm -rf /var/lib/apt/lists/*

RUN npm install
RUN pip install -r requirements.txt --upgrade --break-system-packages

COPY ./server .
COPY ./types /types

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]