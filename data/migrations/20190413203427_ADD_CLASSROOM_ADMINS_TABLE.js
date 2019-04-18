exports.up = function(knex, Promise) {
  return knex.schema.createTable("classroom_admins", table => {
    table.increments();
    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("classroom_id")
      .notNullable()
      .references("id")
      .inTable("classrooms")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .string("user_id_classroom_id")
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("classroom_admins");
};
