const db = require("../dbConfig");

const ClassroomAdmins = require("./classroomAdminsModel");

const getClassroomProjectRoles = require("./classroomProjectsModel")
  .getClassroomProjectRoles;

module.exports = { create, getAll, getById, update, reset, get };

async function create(name, user_id, password) {
  const newClassroom = password ? { name, password } : { name };

  const [classroom_id] = await db("classrooms")
    .insert(newClassroom)
    .returning("id");

  await ClassroomAdmins.newAdmin(user_id, classroom_id);

  return { id: classroom_id, name, classroom_admin_user_ids: [user_id] };
}

async function getAll() {
  return await db.raw(`
  SELECT id, name, count(password) AS isPassword
  FROM classrooms
  GROUP BY id 
  HAVING password
  UNION
  SELECT id, name, count(password) AS isPassword
  FROM classrooms
  GROUP BY id 
  HAVING password IS NULL`);
}

async function getById(id) {
  const classroomPromise = db("classrooms")
    .where({ id })
    .first();
  const classroomProjectsPromise = db
    .from("classroom_projects")
    .select("classroom_projects.id", "projects.name", "projects.description")
    .join("projects", { "classroom_projects.project_id": "projects.id" })
    .where({ "classroom_projects.classroom_id": id });
  const [classroom, projects] = await Promise.all([
    classroomPromise,
    classroomProjectsPromise
  ]);
  const arrayOfRoles = [];
  projects.forEach(project => {
    arrayOfRoles.push(getClassroomProjectRoles(project.id));
  });
  const roles = await Promise.all(arrayOfRoles);
  const projectsWithRoles = projects.map((project, i) => ({
    ...project,
    roles: roles[i]
  }));
  return { ...classroom, projects: projectsWithRoles };
}

async function get(id) {
  return db("classrooms")
    .where({ id })
    .first();
}

async function update(id, changes) {
  return await db("classrooms")
    .where({ id })
    .update(changes);
}

async function reset() {
  await db("classroom_admins").truncate();
  await db("classrooms").truncate();
}
