require('dotenv').config();
const dbConnection = process.env.DATABASE_URL;
module.exports = {
  production: {
    client: "postgresql",
    connection: {
      database:dbConnection
    },
    seeds: {
      directory: "./db/seeds"
    },
    useNullAsDefault: true
  },
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db/lambda.sqlite3"
    },
    seeds: {
      directory: "./db/seeds"
    },
    useNullAsDefault: true
  }
};