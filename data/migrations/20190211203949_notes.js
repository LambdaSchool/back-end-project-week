
exports.up = function (knex, Promise) {
    return knex.schema.createTable('notes', notes => {
        notes.increments('id')
        notes.string('title', 128).notNullable
        notes.text('textBody').notNullable
        notes.specificType('tags', 'text ARRAY')
    })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes')
};
