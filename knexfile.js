require('dotenv').config();

// for local postgress db config
const localPg = {
  host:'localhost',
  database :'db',
  user :process.env.DB_USER,
  password :process.env.DB_PASS,
};

const dbConnection = process.env.DATABASE_URL || localPg

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/db.sqlite3'
    },
    useNullAsDefault :true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
},
production: {
  client: 'pg',
  connection:  dbConnection,
  pool:{
    min:2,
    max:10,
  },
  
  migrations: {
    directory: './data/migrations'
  },
  seeds: {
    directory: './data/seeds'
  }
}
}