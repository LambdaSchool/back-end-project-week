// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/dev.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
      tablename: "dbmigrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
