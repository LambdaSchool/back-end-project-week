
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments()

      tbl
        .string('userName', 225)
        .unique()
        .notNullable()

      tbl
        .string('password', 225)
        .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
