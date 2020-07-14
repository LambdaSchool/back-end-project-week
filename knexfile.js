const localPgConnection = {
  // can be and object or a string
  host: 'localhost', // address to find the db server
  database: 'db',
  user: 'steve',
  password: 'pass',
}

const dbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
