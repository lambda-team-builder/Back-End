exports.up = function(knex, Promise) {
  return knex.schema.createTable("classroom_projects", table => {
    table.increments();
    table
      .integer("project_id")
      .notNullable()
      .references("id")
      .inTable("projects")
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
  return knex.schema.dropTableIfExists("classroom_projects");
};
