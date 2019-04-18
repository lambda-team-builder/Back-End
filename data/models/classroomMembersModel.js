const db = require("../dbConfig");

module.exports = {
  join,
  getAllClassroomsByUserId,
  getMembersByClassroomId,
  leave
};

async function join(classroom_id, user_id) {
  return await db("classroom_members")
    .insert({
      classroom_id,
      user_id,
      user_idWithClassroom_id: `${user_id}${classroom_id}`
    })
    .returning("id");
}
// SELECT classroom_members.id AS classroom_member_id,
// classroom_members.classroom_id,
// classrooms.name AS classroom_name
// FROM classroom_members
// JOIN classrooms
// ON classrooms.id = classroom_members.classroom_id
// where classroom_members.user_id = 2
async function getAllClassroomsByUserId(user_id) {
  return await db("classroom_members")
    .select(
      "classroom_members.id AS classroom_member_id",
      "classroom_members.classroom_id",
      "classrooms.name AS classroom_name"
    )
    .join("classrooms", {
      "classroom_members.classroom_id": "classrooms.id"
    })
    .where({ "classroom_members.user_id": user_id });
}

async function getMembersByClassroomId(classroom_id) {
  return await db("classroom_members")
    .select(
      "classroom_members.id AS classroom_member_id",
      "users.id AS user_id",
      "users.name AS user_name"
    )
    .join("users", {
      "classroom_members.user_id": "users.id"
    })
    .where({ "classroom_members.classroom_id": classroom_id });
}

async function leave(user_id, classroom_id) {
  return await db("classroom_members")
    .where({ user_id, classroom_id })
    .del();
}
