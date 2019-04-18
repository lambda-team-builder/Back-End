const db = require("../dbConfig");

module.exports = {
  create,
  getByClassroomProjectId,
  reset,
  getClassroomAdminsByProjectMemberId,
  updateClassroomMemberId,
  getById,
  getClassroomIdByProjectMemberId,
  getUserIdByProjectMember,
  getProjectsByUserId,
  destroy
};

async function create(role_id, classroom_project_id) {
  const [id] = await db("project_members")
    .insert({
      role_id,
      classroom_project_id
    })
    .returning("id");
  return await db("project_members")
    .where({ id })
    .first();
}
async function getById(id) {
  return await db("project_members")
    .where({ id })
    .first();
}

async function getUserIdByProjectMember(id) {
  return await db("project_members")
    .join("classroom_members", {
      "project_members.classroom_member_id": "classroom_members.id"
    })
    .where({ "project_members.id": id })
    .first();
}

async function updateClassroomMemberId(project_member_id, classroom_member_id) {
  const updateNum = await db("project_members")
    .where({ id: project_member_id })
    .update({ classroom_member_id });
  if (updateNum) {
    return await db("project_members")
      .where({ id: project_member_id })
      .first();
  } else {
    return null;
  }
}

// NOT DONE
async function getByClassroomProjectId(classroom_project_id) {
  return await db("project_members").where({ classroom_project_id });
}

async function getClassroomAdminsByProjectMemberId(project_member_id) {
  const admins = await db.raw(`
  SELECT ca.user_id 
    FROM project_members as pm
    JOIN classroom_projects as cp
    ON cp.id = pm.classroom_project_id
    JOIN classrooms as c
    ON c.id = cp.classroom_id
    JOIN classroom_admins as ca
    ON ca.classroom_id = c.id
    WHERE pm.id = ${project_member_id}`);
  return admins.map(admin => {
    return admin.user_id;
  });
}

async function getClassroomIdByProjectMemberId(id) {
  const obj = await db("classroom_projects")
    .select("classroom_projects.classroom_id")
    .join("project_members", {
      "project_members.classroom_project_id": "classroom_projects.id"
    })
    .where({ "project_members.id": id })
    .first();
  return obj ? obj.classroom_id : null;
}

async function getProjectsByUserId(user_id) {
  return await db("classroom_members")
    .select(
      "projects.name AS project_name",
      "classroom_projects.id AS classroom_project_id",
      "classrooms.id AS classroom_id",
      "classrooms.name AS classroom_name",
      "roles.name AS role_name"
    )
    .join("project_members", {
      "classroom_members.id": "project_members.classroom_member_id"
    })
    .join("classroom_projects", {
      "project_members.classroom_project_id": "classroom_projects.id"
    })
    .join("projects", {
      "classroom_projects.project_id": "projects.id"
    })
    .join("classrooms", { "classroom_members.classroom_id": "classrooms.id" })
    .join("roles", { "project_members.role_id": "roles.id" })
    .where({ "classroom_members.user_id": user_id });
}

async function destroy(id) {
  return await db("project_members")
    .where({ id })
    .del();
}

async function reset() {
  await db("project_members").truncate();
}
