exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      id: 1,
      user_type_id: 1,
      name: "admin",
      email: "admin@admin",
      password: "$2a$14$wh2D6lViJ.2dkRRwcYO2/uvzFOeNZYLaaCRlQe4TFuVX5HuMgzsEW" // 1234 with dev secret
    }
  ]);
};
