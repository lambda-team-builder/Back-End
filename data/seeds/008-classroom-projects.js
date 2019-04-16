exports.seed = function(knex, Promise) {
  return knex("classroom_projects").insert([
    { id: 1, project_id: 1, classroom_id: 1 },
    { id: 2, project_id: 2, classroom_id: 1 },
    { id: 3, project_id: 3, classroom_id: 1 },
    { id: 4, project_id: 4, classroom_id: 1 },
    { id: 5, project_id: 5, classroom_id: 1 },
    { id: 6, project_id: 6, classroom_id: 2 },
    { id: 7, project_id: 7, classroom_id: 2 },
    { id: 8, project_id: 8, classroom_id: 2 },
    { id: 9, project_id: 9, classroom_id: 2 },
    { id: 10, project_id: 1, classroom_id: 2 },
    { id: 11, project_id: 2, classroom_id: 1 },
    { id: 12, project_id: 1, classroom_id: 1 }
  ]);
};
