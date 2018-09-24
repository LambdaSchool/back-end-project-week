// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/lambda_notes.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    }
  }

};
