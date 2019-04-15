const db = require("../dbConfig");

module.exports = { create, getUserTypeById };

async function create(name, email, user_type_id, password) {
  const [id] = await db("users").insert({
    name,
    email,
    user_type_id,
    password
  });
  return { id, name, email };
}

async function getUserTypeById(id) {
  return await db("user_types").where({ id });
}
