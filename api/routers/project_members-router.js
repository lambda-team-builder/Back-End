const router = require("express").Router();

const ProjectMember = require("../../data/models/projectMembersModel");
/**
 *  @api {put} api/project_members/:id  Add user to a member slot for group admin
 *  @apiVersion 0.1.0
 *  @apiName putProjectMembers/:id
 *  @apiGroup ProjectMembers
 *
 *  @apiHeader {String} Authorization Admin of groups auth token.
 *
 *  @apiParam {String} user_id The user_id or null to remove a user
 *
 *  @apiParamExample {json} Request-Example: Add user to slot
 * {
 *  "user_id": 2
 * }
 *  @apiParamExample {json} Request-Example: remove user from slot
 * {
 *  "user_id": null
 * }
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
 *      "user_id": 1,
 *      "classroom_project_id": 1
 *    }
 *  @apiSuccessExample Success-Response: remove user
 *    HTTP/1.1 201 CREATED
 *    {
 *      "id": 1,
 *      "role_id": 1,
 *      "user_id": null,
 *      "classroom_project_id": 1
 *    }
 *  @apiErrorExample Error-Response: Not all fields
 *    HTTP/1.1 401 BAD REQUEST
 *    {
 *      "message": "All fields required"
 *    }
 *  @apiErrorExample Error-Response: Not group admin
 *    HTTP/1.1 403 FORBIDDEN
 *    {
 *      "message": "This user is not a group admin for this group"
 *    }
 *  @apiErrorExample Error-Response: not valid member
 *    HTTP/1.1 404 NOT FOUND
 *    {
 *      "message": "That project member slot does not exist"
 *    }
 */
// for admin of group to add a user
router.put("/:id", async (req, res) => {
  const user_id = req.body.user_id;
  const project_member_id = req.params.id * 1;
  // NEED TO MAKE SURE THE USER IS A ADMIN OF THIS CLASSROOM
  let classroomAdminUserIds;
  try {
    // get a list of admins for classroom for this project_member
    classroomAdminUserIds = await ProjectMember.getClassroomAdminsByProjectMemberId(
      project_member_id
    );
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
  if (!classroomAdminUserIds.includes(req.user.id)) {
    res.status(403).json({
      message: "This user is not a group admin for this group"
    });
    // allow for admins to remove a user from a spot
  } else if (user_id || user_id === null) {
    ProjectMember.updateUserId(project_member_id, user_id)
      .then(projectMember => {
        if (projectMember === null) {
          res
            .status(404)
            .json({ message: "That project member slot does not exist" });
        } else {
          res.status(200).json(projectMember);
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Server error",
          error
        });
      });
  } else {
    res.status(401).json("All fields required");
  }
});
/**
 *  @api {put} api/project_members/:id/join  User fills a member slot
 *  @apiVersion 0.1.0
 *  @apiName putProjectMembers/:id/join
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
 *      "user_id": 1,
 *      "classroom_project_id": 1
 *    }
 *  @apiErrorExample Error-Response: spot filled
 *    HTTP/1.1 403 FORBIDDEN
 *    {
 *      "message": "Spot is already filled"
 *    }
 */
// user joins a member_slot
router.put("/:id/join", async (req, res) => {
  try {
    const project_member_id = req.params.id * 1;
    // can only join if the slot is open
    const projectMember = await ProjectMember.getById(project_member_id);
    if (projectMember.user_id === null) {
      // it is open
      const newProjectMember = await ProjectMember.updateUserId(
        project_member_id,
        req.user.user_id
      );
      res.status(200).json(newProjectMember);
    } else {
      res.status(403).json({ message: "Spot is already filled" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
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
router.put("/:id/leave", async (req, res) => {
  try {
    const project_member_id = req.params.id * 1;
    // can only leave if this user is alread a member
    const projectMember = await ProjectMember.getById(project_member_id);
    if (projectMember.user_id === req.user.id) {
      const newProjectMember = await ProjectMember.updateUserId(
        project_member_id,
        null
      );
      res.status(200).json(newProjectMember);
    } else {
      res.status(403).json({ message: "User already not filling this spot." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
