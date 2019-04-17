exports.up = function(knex, Promise) {
  return knex.schema.createTable("project_members", table => {
    table.increments();
    table
      .integer("role_id")
      .notNullable()
      .references("id")
      .inTable("roles")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("classroom_member_id")
      .nullable()
      .references("id")
      .inTable("classroom_members")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("classroom_project_id")
      .notNullable()
      .references("id")
      .inTable("classroom_projects")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("project_members");
};
