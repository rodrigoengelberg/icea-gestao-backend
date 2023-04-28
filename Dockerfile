FROM node:14.20.1-alpine3.15 AS build

RUN apk add git

ENV DB_SERVER=localhost
ENV DB_PORT=5432
ENV DB_NAME=dbicea
ENV DB_USER=admicea
ENV DB_PASSWORD=postgres
ENV FRONT_SERVER=http://localhost:3005

WORKDIR /api

RUN git clone https://github.com/rodrigoengelberg/icea-gestao-backend.git .

RUN npm install --quite --no-daemon
RUN npm run build --quite --no-daemon

EXPOSE 3333
WORKDIR /api

COPY --from=build /api/build .

CMD ["npm", "run", "start"]
