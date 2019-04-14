const db = require("../dbConfig");

module.exports = { create, get };

async function create(name, description) {
  const [id] = await db("projects").insert({ name, description });
  return id;
}

async function get() {
  return await db("projects");
}
