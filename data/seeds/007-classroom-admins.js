exports.seed = function(knex, Promise) {
  return knex("classroom_admins").insert([
    { user_id: 1, classroom_id: 1 },
    { user_id: 1, classroom_id: 2 },
    { user_id: 1, classroom_id: 3 },
    { user_id: 2, classroom_id: 1 },
    { user_id: 2, classroom_id: 2 },
    { user_id: 4, classroom_id: 1 }
  ]);
};
