const db = require("../dbConfig");

module.exports = {
  getAdminsByClassroomId,
  getclassroomAdminsByUserId,
  newAdmin
};

async function newAdmin(user_id, classroom_id) {
  return db("classroom_admins")
    .insert({
      user_id,
      classroom_id,
      user_id_classroom_id: `${user_id}${classroom_id}`
    })
    .returning("id");
}

async function getAdminsByClassroomId(classroom_id) {
  const adminIdsInObj = await db("classroom_admins")
    .select("user_id")
    .where({ classroom_id });
  const ids = adminIdsInObj.map(admin => admin.user_id);
  return ids;
}

// SELECT classroom_admins.id AS classroom_admins_id, classrooms.id AS classroom_id, classrooms.name AS classroom_name
// FROM classroom_admins
// JOIN classrooms
// ON classrooms.id = classroom_admins.classroom_id
// WHERE classroom_admins.user_id = 2

async function getclassroomAdminsByUserId(id) {
  return await db("classroom_admins")
    .select(
      "classroom_admins.id AS classroom_admins_id",
      "classrooms.id AS classroom_id",
      "classrooms.name AS classroom_name"
    )
    .join("classrooms", { "classroom_admins.classroom_id": "classrooms.id" })
    .where({ "classroom_admins.user_id": id });
}
