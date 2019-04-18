exports.seed = function(knex, Promise) {
  return knex("classrooms").insert([
    { name: "build week 1" },
    { name: "build week 2" },
    { name: "build week 3" }
  ]);
};
