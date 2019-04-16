const db = require("../dbConfig");

module.exports = { create, getUserTypeById };

async function create(name, email, user_type_id, password) {
  const [id] = await db("users")
    .insert({
      name,
      email,
      user_type_id,
      password
    })
    .returning("id"); // .returning(["id", "email", "user_type_id"])
  return { id, name, email };
}

async function getUserTypeById(id) {
  const [user_type] = await db("user_types").where({ id });
  return user_type;
}
