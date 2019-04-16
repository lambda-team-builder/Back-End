exports.seed = function(knex, Promise) {
  return knex("classrooms").insert([
    { id: 1, name: "build week 1" },
    { id: 2, name: "build week 2" },
    { id: 3, name: "build week 3" }
  ]);
};
