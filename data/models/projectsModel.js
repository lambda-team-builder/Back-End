const db = require("../dbConfig");

module.exports = { create };

async function create(name, description) {
  return ([id] = await db("projects").insert({ name, description }));
}
