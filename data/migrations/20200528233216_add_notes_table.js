exports.up = function(knex) {
    return knex.schema.createTable("notes", function(notes) {
        notes.increments();
        notes.string("title", 128).notNullable();
        notes.text("content").notNullable();
        // notes.boolean("completed").defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("notes");
};
