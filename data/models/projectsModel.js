const db = require("../dbConfig");

module.exports = { create, get, reset };

async function create(name, description) {
  const [id] = await db("projects")
    .insert({ name, description })
    .returning("id");
  return id;
}

async function get() {
  return await db("projects");
}

async function reset() {
  await db("projects").truncate();
}
