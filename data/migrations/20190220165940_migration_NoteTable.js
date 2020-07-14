
exports.up = function(knex, Promise) {
  return knex.schema.createTable('NoteTable', (table) =>{
      table.increments('_id');
      table.string('title').notNullable();
    table.string('textBody').notNullable();
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('NoteTable')
};
