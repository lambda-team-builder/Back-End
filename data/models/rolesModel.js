const db = require("../dbConfig");

module.exports = { create, get, reset };

async function create(name) {
  const [id] = await db("roles").insert({ name });
  return id;
}

async function get() {
  return await db("roles");
}

async function reset() {
  await db("roles").truncate();
}
