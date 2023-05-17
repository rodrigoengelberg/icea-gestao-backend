module.exports = [
  {
    name: 'default',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: process.env.SSL_REJECT
    },
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

]
