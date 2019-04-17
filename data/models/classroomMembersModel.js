const db = require("../dbConfig");

module.exports = { join };

async function join(classroom_id, user_id) {
  return await db("classroom_members")
    .insert({
      classroom_id,
      user_id,
      user_idWithClassroom_id: `${user_id}${classroom_id}`
    })
    .returning("id");
}
