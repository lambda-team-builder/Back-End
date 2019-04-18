exports.seed = function(knex, Promise) {
  return knex("classroom_projects").insert([
    { project_id: 1, classroom_id: 1 },
    { project_id: 2, classroom_id: 1 },
    { project_id: 3, classroom_id: 1 },
    { project_id: 4, classroom_id: 1 },
    { project_id: 5, classroom_id: 1 },
    { project_id: 6, classroom_id: 2 },
    { project_id: 7, classroom_id: 2 },
    { project_id: 8, classroom_id: 2 },
    { project_id: 9, classroom_id: 2 },
    { project_id: 1, classroom_id: 2 },
    { project_id: 2, classroom_id: 1 },
    { project_id: 1, classroom_id: 1 }
  ]);
};
