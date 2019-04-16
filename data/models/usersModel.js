const db = require("../dbConfig");

module.exports = { create, getUserTypeById, getByEmail, updatePassword };

async function create(name, email, user_type_id, password) {
  const [id] = await db("users")
    .insert({
      name,
      email,
      user_type_id,
      password
    })
    .returning("id");
  return { id, name, email };
}

async function getUserTypeById(id) {
  return await db("user_types")
    .where({ id })
    .first();
}

async function getByEmail(email) {
  return await db("users")
    .where({ email })
    .first();
}

async function updatePassword(id, password) {
  return await db("users")
    .where({ id })
    .update({ password });
}
