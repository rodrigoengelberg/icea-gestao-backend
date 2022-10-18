FROM node:14.20.1-alpine3.15
# RUN apk add git

# ENV DB_SERVER=localhost
# ENV DB_PORT=5432
# ENV DB_NAME=iceaDB
# ENV DB_USER=postgres
# ENV DB_PASSWORD=postgres
# ENV FRONT_SERVER=http://localhost:3005

WORKDIR /api

COPY package*.json ./

# RUN git clone https://github.com/rodrigoengelberg/icea-gestao-backend .

# RUN npm install --no-daemon
# RUN npm run build --no-daemon

RUN npm install
# RUN npm run build

COPY . .

EXPOSE 3333

CMD ["npm", "run", "start"]
