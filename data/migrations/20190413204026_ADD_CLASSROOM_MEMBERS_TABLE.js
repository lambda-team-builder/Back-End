exports.up = function(knex, Promise) {
  return knex.schema.createTable("classroom_members", table => {
    table.increments();
    table
      .string("user_idWithClassroom_id")
      .notNullable()
      .unique();
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
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("classroom_members");
};
