
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(tbl) {
    tbl.increments('id');
    
    tbl
      .string('title', 64)
      .notNullable();
      tbl
      .string('textBody', 1024)
      .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};