exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table
      .string("email", 255)
      .notNullable()
      .unique();
    table.string("name", 255).notNullable();
    table.string("password", 255).notNullable();
    table
      .integer("user_type_id")
      .notNullable()
      .references("id")
      .inTable("user_types")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
