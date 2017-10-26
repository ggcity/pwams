FROM node:6

RUN mkdir -p /var/www/html/zebracore
WORKDIR /var/www/html/zebracore

COPY package.json /var/www/html/zebracore
RUN npm install
RUN npm install -g json-server@0.9.1

COPY . /var/www/html/zebracore

EXPOSE 4200
EXPOSE 3000

CMD ["./run.sh"]
