FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 6500
CMD [ "npm","run","start:dev" ]