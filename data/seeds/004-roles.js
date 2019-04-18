exports.seed = function(knex, Promise) {
  return knex("roles").insert([
    { name: "Front end" },
    { name: "Back end" },
    { name: "UI" },
    { name: "UX" },
    { name: "Team lead" },
    { name: "Data" }
  ]);
};
