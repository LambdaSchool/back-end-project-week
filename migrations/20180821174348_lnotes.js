exports.up = function(knex, Promise) {
  return knex.schema.createTable('lnontes', note => {
    note.increments();
    note.string('title').notNullable().unique();
    note.string('content').notNullable();
  });
};

exports.down = function(knex, Promise) {

};
