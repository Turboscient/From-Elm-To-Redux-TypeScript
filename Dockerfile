# https://blog.appsignal.com/2021/10/19/how-to-dockerize-an-existing-nodejs-application.html

# docker run -p 3000:3000 elm-redux-typescript

# docker ps -a    lists all running containers

FROM node:18.1

WORKDIR /app

RUN yarn --frozen-lockfile

COPY package.json yarn.lock ./

COPY . .

EXPOSE 3000

CMD yarn start