exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      id: 1,
      user_type_id: 1,
      name: "admin",
      email: "admin@admin",
      password: "1234"
    }
  ]);
};
