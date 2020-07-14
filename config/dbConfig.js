const knex = require('knex');
const config = require('../knexfile.js');

const db_Env = process.env.DB_ENV || 'production'

module.exports = knex(config[db_Env]);
