exports.seed = function(knex, Promise) {
  return knex("user_types").insert([
    { name: "admin" }, // 1
    { name: "student" } // 2
  ]);
};
