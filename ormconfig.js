module.exports = [
  {
    name: 'default',
    type: 'postgres',
    // url: process.env.DATABASE_URL,
    // ssl: {
    //   rejectUnauthorized: true
    // },
    // postgres://xlmiyfsxcayqzi:5c0c419bfb39d8f002d2f513c76ec94b67882e48ca716a090c91b13064955b30@ec2-54-208-17-82.compute-1.amazonaws.com:5432/d2r36ecrlgs719
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
      //  './src/modules/**/infra/typeorm/entities/*.ts'
      './dist/modules/**/infra/typeorm/entities/*.js'
    ],
    migrations: [
      //  './src/shared/infra/typeorm/migrations/*.ts'
      './dist/shared/infra/typeorm/migrations/*.js'
    ],
    cli: {
      migrationsDir:
        //  './src/shared/infra/typeorm/migrations'
        './dist/shared/infra/typeorm/migrations'
    }
  }
  // {
  //   "name": "mongo",
  //   "type": "mongodb",
  //   "host": "localhost",
  //   "port": 27017,
  //   "database": "gobarber",
  //   "useUnifiedTopology": true,
  //   "entities": [
  //     "./src/modules/**/infra/typeorm/schemas/*.ts"
  //   ]
  // }

]
