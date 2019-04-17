const cleaner = require("knex-cleaner");

// This will prevent foreign key errors
// when tring to truncate tables with
// foreign keys pointing to them

exports.seed = function(knex) {
  return cleaner.clean(knex, {
    mode: "delete",
    ignoreTables: ["knex_migrations", "knex_migrations_lock"]
  });
  // empties all tables
  // resets all primary keys
};
