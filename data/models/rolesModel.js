const db = require("../dbConfig");

module.exports = { create, get, reset, update };

async function create(name) {
  const [id] = await db("roles")
    .insert({ name })
    .returning("id");
  return id;
}

async function get() {
  return await db("roles");
}

async function update(id, name) {
  const updated = await db("roles")
    .where({ id })
    .update({ name });
  return updated ? true : false;
}

async function reset() {
  await db("roles").truncate();
}
