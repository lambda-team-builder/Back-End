const db = require("../dbConfig");

module.exports = {
  create,
  getByClassroomProjectId,
  reset,
  getClassroomAdminsByProjectMemberId,
  updateUserId,
  getById
};

async function create(role_id, classroom_project_id) {
  const [id] = await db("project_members").insert({
    role_id,
    classroom_project_id
  });
  return await db("project_members")
    .where({ id })
    .first();
}
async function getById(id) {
  return await db("project_members")
    .where({ id: project_member_id })
    .first();
}
async function updateUserId(project_member_id, user_id) {
  const updateNum = await db("project_members")
    .where({ id: project_member_id })
    .update({ user_id });
  if (updateNum) {
    return await db("project_members")
      .where({ id: project_member_id })
      .first();
  } else {
    return null;
  }
}

// NOT DONE
async function getByClassroomProjectId(classroom_project_id) {
  return await db("project_members").where({ classroom_project_id });
}

async function getClassroomAdminsByProjectMemberId(project_member_id) {
  const admins = await db.raw(`
  SELECT ca.user_id 
    FROM project_members as pm
    JOIN classroom_projects as cp
    ON cp.id = pm.classroom_project_id
    JOIN classrooms as c
    ON c.id = cp.classroom_id
    JOIN classroom_admins as ca
    ON ca.classroom_id = c.id
    WHERE pm.id = ${project_member_id}`);
  return admins.map(admin => {
    return admin.user_id;
  });
}

async function reset() {
  await db("project_members").truncate();
}
/**
 *  @api {put} api/project_members/:id/leave  User leaves a member slot
 *  @apiVersion 0.1.0
 *  @apiName putProjectMembers/:id/leave
 *  @apiGroup ProjectMembers
 *
 *  @apiHeader {String} Authorization User's auth token.
 *
 *  @apiSuccess {Number} id The id of the project member
 *  @apiSuccess {Number} role_id The role id of this project member
 *  @apiSuccess {Number} user_id The user id of this project member
 *  @apiSuccess {Number} classroom_project_id The id of C.P. that this project member belongs to
 *
 *  @apiSuccessExample Success-Response: add user
 *    HTTP/1.1 201 CREATED
 *    {
 *      "id": 1,
 *      "role_id": 1,
 *      "user_id": null,
 *      "classroom_project_id": 1
 *    }
 *  @apiErrorExample Error-Response: spot filled
 *    HTTP/1.1 403 FORBIDDEN
 *    {
 *      "message": "User already not filling this spot."
 *    }
 */
