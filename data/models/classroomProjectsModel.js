const db = require("../dbConfig");

module.exports = {
  create,
  getById,
  getClassroomProjectRoles,
  getOnlyClassroomProjectById,
  destroy
};

async function create(project_id, classroom_id) {
  const [id] = await db("classroom_projects")
    .insert({ project_id, classroom_id })
    .returning("id");
  return { id, classroom_id, project_id };
}

async function getProjectsByClassroomId(classroom_id) {}

async function getById(id) {
  // classroom_project_id
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

async function getOnlyClassroomProjectById(id) {
  return await db("classroom_projects")
    .where({ id })
    .first();
}

async function destroy(id) {
  return await db("classroom_projects")
    .where({ id })
    .del();
}

function getClassroomProjectRoles(classroom_project_id) {
  // SELECT project_members.id, project_members.classroom_member_id,
  // users.id as user_id, users.name as user_name, roles.id as role_id ,
  // roles.name as role_name
  // FROM project_members
  // JOIN roles
  // ON roles.id = project_members.role_id
  // LEFT JOIN classroom_members
  // ON classroom_members.id = project_members.classroom_member_id
  // LEFT JOIN users
  // ON users.id = classroom_members.user_id
  // WHERE project_members.classroom_project_id = 3
  return db
    .from("project_members")
    .select(
      "project_members.id",
      "project_members.classroom_member_id",
      "users.id as user_id",
      "classroom_members.id as classroom_member_id ",
      "users.name as user_name",
      "roles.id as role_id",
      "roles.name as role_name"
    )
    .join("roles", {
      "project_members.role_id": "roles.id"
    })
    .leftJoin("classroom_members", {
      "project_members.classroom_member_id": "classroom_members.id"
    })
    .leftJoin("users", {
      "classroom_members.user_id": "users.id"
    })
    .where({
      "project_members.classroom_project_id": classroom_project_id
    });
}
