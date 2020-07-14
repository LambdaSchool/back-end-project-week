
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(tbl) {
    tbl.increments().primary();
    tbl.string("username").unique().notNullable();
    tbl.text("password").notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
