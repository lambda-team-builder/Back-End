exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", table => {
    table.increments();
    table
      .string("name", 255)
      .notNullable()
      .unique();
    table.text("description", 3000).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable("projects");
};
