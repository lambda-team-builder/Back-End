const db = require("../dbConfig");

module.exports = { create };

async function create(project_id, classroom_id) {
  const [id] = await db("classroom_projects")
    .insert({ project_id, classroom_id })
    .returning("id");
  return { id, classroom_id, project_id };
}
