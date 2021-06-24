module.exports = [
  {
    "name": "default",
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    // "host": "localhost",
    // "port": 5432,
    // "username": "docker",
    // "password": "docker",
    // "database": "gostack_gobarber",
    "entities": [
      //"./src/modules/**/infra/typeorm/entities/*.ts"
      "./dist/modules/**/infra/typeorm/entities/*.js"
    ],
    "migrations": [
      // "./src/shared/infra/typeorm/migrations/*.ts"
      "./dist/shared/infra/typeorm/migrations/*.js"
    ],
    "cli": {
      // "migrationsDir": "./src/shared/infra/typeorm/migrations"
      "migrationsDir": "./dist/shared/infra/typeorm/migrations"
    }
  },
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
