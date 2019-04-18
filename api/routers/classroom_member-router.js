const router = require("express").Router();

const ClassroomMembers = require("../../data/models/classroomMembersModel");

/**
 *  @api {get} api/classroom_members/mine get user's clasrooms
 *  @apiVersion 0.1.0
 *  @apiName getUsersClassrooms
 *  @apiGroup Classrooms
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiSuccess {Array} classrooms A list of user's classrooms
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        classroom_member_id: 3,
 *        classroom_id: 1,
 *        classroom_name: "build week 1"
 *      },
 *      {
 *        classroom_member_id: 14,
 *        classroom_id: 2,
 *        classroom_name: "build week 2"
 *      }
 *    ]
 */

router.get("/mine", (req, res) => {
  ClassroomMembers.getAllClassroomsByUserId(req.user.id)
    .then(classrooms => {
      res.status(200).json(classrooms);
    })
    .catch(error => res.status(500).json({ message: "Server Error", error }));
});

module.exports = router;
