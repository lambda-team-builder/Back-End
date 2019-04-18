const db = require("../dbConfig");

module.exports = { create, get, reset, update };

async function create(name, description) {
  const [id] = await db("projects")
    .insert({ name, description })
    .returning("id");
  return id;
}

async function get() {
  return await db("projects");
}

async function update(updateObject, id) {
  return await db("projects")
    .update(updateObject)
    .where({ id });
}

async function reset() {
  await db("projects").truncate();
}
