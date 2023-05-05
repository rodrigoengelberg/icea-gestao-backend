FROM node:14-alpine AS build

RUN apk add git

WORKDIR /api

ENV DB_SERVER=localhost
ENV DB_PORT=5432
ENV DB_NAME=dbicea
ENV DB_USER=admicea
ENV DB_PASSWORD=postgres
ENV FRONT_SERVER=http://localhost:3005

RUN git clone https://github.com/rodrigoengelberg/icea-gestao-backend.git .

COPY . .

RUN npm install
RUN npm run build

WORKDIR /api

COPY --from=build /api/dist/ ./

EXPOSE 3333

CMD ["npm", "run", "start"]
