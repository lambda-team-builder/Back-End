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
 *  @apiSuccess {Number} id The id of the classroom
 *  @apiSuccess {String} name Name of the classroom
 *  @apiSuccess {Array} classroom_admin_user_ids List of group's admins by id
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

module.exports = router;
