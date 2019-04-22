const router = require("express").Router();

const ClassroomAdmin = require("../../data/models/classroomAdminsModel");

const restrictClassroomAdmin = require("../authorization/authenticate")
  .restrictClassroomAdmin;
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

/**
 *  @api {post} api/classroom_admins/classroom/:id Makes a user a classroom admin
 *  @apiVersion 0.1.0
 *  @apiName postClassroomAdmins
 *  @apiGroup ClassroomAdmins
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiParam {Number} user_id The user to become a classroom admin
 *
 *  @apiParmamExample {json} Request Example:
 *  {
 *    "user_id":5
 *  }
 *
 *  @apiSuccess {Array} classrooms A list of classrooms.
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *           [
 *                {
 *                    "user_name": "admin",
 *                    "user_id": 1,
 *                    "classroom_admin_id": 1
 *                },
 *                {
 *                    "user_name": "Tim",
 *                    "user_id": 2,
 *                    "classroom_admin_id": 4
 *                },
 *                {
 *                    "user_name": "Connor",
 *                    "user_id": 4,
 *                    "classroom_admin_id": 6
 *                }
 *            ]
 *
 *
 *  @apiErrorExample Error-Response:
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "User already a classroom admin or user does not existr"
 *    }
 *  @apiErrorExample Error-Response:
 *  HTTP/1.1 422 UNPROCESSABLE ENTITY
 *  {
 *     message: "user_id required"
 *  }
 */

router.post("/classroom/:id", restrictClassroomAdmin, (req, res) => {
  const user_id = req.body.user_id;
  if (user_id) {
    ClassroomAdmin.newAdmin(user_id, req.params.id * 1)
      .then(id => {
        ClassroomAdmin.getAdminsWithNamesByClassroomId(req.params.id * 1)
          .then(admins => {
            res.status(200).json(admins);
          })
          .catch(error => {
            res.status(500).json({ message: "Server Error" });
          });
      })
      .catch(error => {
        res.status(400).json({
          message: "User already a classroom admin or user does not exist",
          error
        });
      });
  } else {
    res.status(401).json({ message: "user_id required" });
  }
});

module.exports = router;
