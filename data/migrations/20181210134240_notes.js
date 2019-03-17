
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', table => {
        table.increments()
        table.string('title', 255).notNullable()
        table.text('content').notNullable()
        table.string('uid').notNullable()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes')
};
