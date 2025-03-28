FROM node:slim

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

# Cambia el puerto a 4042
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4042"]
