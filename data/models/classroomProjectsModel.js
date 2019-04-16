const db = require("../dbConfig");

module.exports = { create, getById };

async function create(project_id, classroom_id) {
  const [id] = await db("classroom_projects")
    .insert({ project_id, classroom_id })
    .returning("id");
  return { id, classroom_id, project_id };
}

async function getProjectsByClassroomId(classroom_id) {}

async function getById(id) {
  const projectPromise = db("classroom_projects")
    .select("classroom_projects.id", "projects.name", "projects.description")
    .join("projects", { "classroom_projects.project_id": "projects.id" })
    .where({ "classroom_projects.id": id })
    .first();
  const projectMembersPromise = getClassroomProjectRoles(id);
  const [project, project_members] = await Promise.all([
    projectPromise,
    projectMembersPromise
  ]);
  return { ...project, project_members };
}

function getClassroomProjectRoles(classroom_project_id) {
  // SELECT pm.id, pm.user_id, u.name as user_name, r.id as role_id ,r.name as role_name
  // FROM project_members AS pm
  // JOIN roles as r
  // ON r.id = pm.role_id
  // LEFT JOIN users as u
  // ON u.id = pm.user_id
  // WHERE pm.classroom_project_id = 1
  return db
    .from("project_members")
    .select(
      "project_members.id",
      "project_members.user_id",
      "users.name as user_name",
      "project_members.id",
      "roles.name as role_name"
    )
    .join("roles", {
      "project_members.role_id": "roles.id"
    })
    .leftJoin("users", {
      "project_members.user_id": "users.id"
    })
    .where({
      "project_members.classroom_project_id": classroom_project_id
    });
}
