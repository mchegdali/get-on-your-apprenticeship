FROM node:16-alpine

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

# install dependencies
RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]

