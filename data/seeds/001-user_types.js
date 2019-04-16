exports.seed = function(knex, Promise) {
  return knex("user_types").insert([
    { id: 1, name: "admin" }, // 1
    { id: 2, name: "student" } // 2
  ]);
};
