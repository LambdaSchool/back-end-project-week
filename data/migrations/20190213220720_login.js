
exports.up = function(knex, Promise) {
  return knex.schema.createTable('login', table => {
      table.increments(); 
      table.string('username').notNullable().unique()
      table.string('password').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(); 
};
