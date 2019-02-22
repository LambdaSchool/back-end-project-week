// Update with your config settings.
require("dotenv").config();
// localdbConnector = {
//   client: 'localhost',
//   database: 'notes',
//   user: 'jbrock',
//   password: 'Letmein'
// }
//const dbConnector = process.env.DATABASE_URL || localdbConnector;
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/notes.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/Migrations'
    },
    seeds: {
      directory: './data/Seeds'
    }
  },
  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/notes.sqlite3'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/Migrations'
    },
    seeds: {
      directory: './data/Seeds'
    }
  }

};
