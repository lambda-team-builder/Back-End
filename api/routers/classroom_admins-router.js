const router = require("express").Router();

const ClassroomAdmin = require("../../data/models/classroomAdminsModel");

/**
 *  @api {get} api/classroom_admins/ Get a list of user's classrooms that user admin's
 *  @apiVersion 0.1.0
 *  @apiName getClassroomAdmins
 *  @apiGroup ClassroomAdmins
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiSuccess {Array} classrooms A list of classrooms.
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    [
 *       {
 *           "classroom_admins_id": 1,
 *           "classroom_id": 1,
 *           "classroom_name": "build week 1"
 *       },
 *       {
 *           "classroom_admins_id": 2,
 *           "classroom_id": 2,
 *           "classroom_name": "build week 2"
 *       },
 *       {
 *           "classroom_admins_id": 3,
 *           "classroom_id": 3,
 *           "classroom_name": "build week 3"
 *       }
 *    ]
 *
 *
 *  @apiErrorExample Error-Response:
 *    HTTP/1.1 500 INTERNAL SERVER ERROR
 *    {
 *      "message": "server Error",
 *      "error": {error object: ""}
 *    }
 */

router.get("/", (req, res) => {
  const user_id = req.user.id;
  ClassroomAdmin.getclassroomAdminsByUserId(user_id)
    .then(adminOfList => {
      res.status(200).json(adminOfList);
    })
    .catch(error => {
      res.status(500).json({ message: "server Error", error });
    });
});

module.exports = router;
