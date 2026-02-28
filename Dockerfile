FROM node:18-slim

WORKDIR /server

COPY ./server .
COPY ./types /types

RUN apt-get update && apt-get install -y \
ffmpeg \
python3-pip \
python-is-python3 \
portaudio19-dev \
&& rm -rf /var/lib/apt/lists/*


RUN pip install -r requirements.txt --upgrade --break-system-packages

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]