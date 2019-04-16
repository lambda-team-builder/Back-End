exports.seed = function(knex, Promise) {
  return knex("roles").insert([
    { id: 1, name: "Front end" },
    { id: 2, name: "Back end" },
    { id: 3, name: "UI" },
    { id: 4, name: "UX" },
    { id: 5, name: "Team lead" },
    { id: 6, name: "Data" }
  ]);
};
