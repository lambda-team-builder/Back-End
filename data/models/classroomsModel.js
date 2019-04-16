const db = require("../dbConfig");

module.exports = { create, getAll, getById, update, reset };

async function create(name, user_id) {
  const idsClassrooms = await db("classrooms")
    .insert({ name })
    .returning("id");
  const classroom_id = idsClassrooms[0];
  const classroom_admin_user_ids = await db("classroom_admins")
    .insert({
      classroom_id,
      user_id
    })
    .returning("id");
  return { id: classroom_id, name, classroom_admin_user_ids };
}

async function getAll() {
  return await db("classrooms");
}

async function getById(id) {
  return await db("classrooms")
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
