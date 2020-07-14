
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(tbl){
        tbl.increments();
        tbl.string('title', 200).notNullable();
        tbl.string('textBody',300).notNullable();
    })
};

exports.down = function(knex, Promise) {
    exports.down = function(knex, Promise) {
        return knex.schema.dropTableIfExists('notes')
    };
};
