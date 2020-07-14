
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    tbl.increments();

    tbl.string('username', 128).notNullable().unique('user_name');

    tbl.string('password', 128).notNullable();

    tbl.boolean('LoggedIn')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')
};
