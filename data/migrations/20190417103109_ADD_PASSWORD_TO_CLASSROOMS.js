exports.up = function(knex, Promise) {
  return knex.schema.table("classrooms", table => {
    table.string("password");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("classrooms", table => {
    table.dropColumn("password");
  });
};
