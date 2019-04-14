exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_types", table => {
    table.increments();
    table
      .string("name", 255)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("user_types");
};
