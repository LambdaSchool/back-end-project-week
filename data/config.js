const dbEnvironment = process.env.DB_ENVIRONMENT || 'production';
const config = require('../knexfile.js')[dbEnvironment];

module.exports = require('knex')(config);