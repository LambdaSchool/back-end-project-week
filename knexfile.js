// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/notes.sqlite3'
    },
    useNullAsDefault:true,
    migrations: {
      directory: './database/migrations'
    },
    seeds:{
      directory:'./database/seeds'
    }
  },

  production:{
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool:{
      min:2,
      max:10,
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds:{
      directory:'./database/seeds'
    }
  }
};
