const db = require("../dbConfig");

module.exports = { getAdminsByClassRoomId };

async function getAdminsByClassRoomId(classroom_id) {
  const adminIdsInObj = await db("classroom_admins")
    .select("user_id")
    .where({ classroom_id });
  return adminIdsInObj.map(admin => admin.user_id);
}
