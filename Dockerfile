FROM node:14-alpine AS build

RUN apk add git

WORKDIR /api

ENV DB_SERVER=localhost
ENV DB_PORT=5432
ENV DB_NAME=postgres
ENV DB_USER=admicea
ENV DB_PASSWORD=1234
ENV FRONT_SERVER=http://localhost:8801

RUN git clone https://github.com/rodrigoengelberg/icea-gestao-backend.git .

RUN npm install
RUN npm run build

FROM node:14-alpine AS publish

ARG db_server
ARG db_port
ARG db_name
ARG db_user
ARG db_password
ARG front_server

ENV DB_SERVER=${db_server}
ENV DB_PORT=${db_port}
ENV DB_NAME=${db_name}
ENV DB_USER=${db_user}
ENV DB_PASSWORD=${db_password}
ENV FRONT_SERVER=${front_server}

WORKDIR /api

COPY --from=build /api/ ./

EXPOSE 3333

CMD ["npm", "run", "start"]
