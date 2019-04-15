const db = require("../dbConfig");

module.exports = { create, getByClassroomProjectId, reset };

async function create(role_id, classroom_project_id) {
  const [id] = await db("project_members").insert({
    role_id,
    classroom_project_id
  });
  return await db("project_members")
    .where({ id })
    .first();
}
// NOT DONE
async function getByClassroomProjectId(classroom_project_id) {
  return await db("project_members").where({ classroom_project_id });
}

async function reset() {
  await db("project_members").truncate();
}
