const environment = process.env.DB_ENVIRONMENT || 'development'
const knex = require('knex');
const knexConfig = require('../knexfile.js');//[environment];
module.exports = knex(knexConfig.development);

