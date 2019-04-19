const router = require("express").Router();

const restrictClassroomAdmin = require("../authorization/authenticate")
  .restrictClassroomAdmin;

const isMemberOrAdmin = require("../isMemberOrAdmin");

//models
const Classrooms = require("../../data/models/classroomsModel.js");
const ClassroomProjects = require("../../data/models/classroomProjectsModel");
const ClassroomAdmin = require("../../data/models/classroomAdminsModel");
const ClassroomMembers = require("../../data/models/classroomMembersModel");
/**
 *  @api {get} api/classrooms/ Get list of all classrooms
 *  @apiVersion 0.1.0
 *  @apiName getClassrooms
 *  @apiGroup Classrooms
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiSuccess {Array} A list of all classrooms
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *       [{
 *          id: 1,
 *          name: "Build Week 2",
 *          password: 1
 *       },
 *       {
 *          id: 2,
 *          name: "Build Week 2"
 *          password: 0
 *       }]
 */
router.get("/", async (req, res) => {
  try {
    const classroomList = await Classrooms.getAll();
    res.status(200).json(classroomList);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
/**
 *  @api {get} api/classrooms/:id Get classroom by ID
 *  @apiVersion 0.3.0
 *  @apiName getClassroom
 *  @apiGroup Classrooms
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiSuccess {Number} id the id of the classroom
 *  @apiSuccess {String} name The name of the classroom
 *  @apiSuccess {Array} projects A list of the classroom's projects
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *      {
 *          "id": 1,
 *          "name": "Classroom one",
 *          "is_admin": true,
 *          "projects": [
 *              {
 *                  "id": 1,
 *                  "name": " a project",
 *                  "description": "This is a long and boring project.",
 *                  "roles": [
 *                     {
 *                         "id": 1,
 *                         "classroom_member_id": 1,
 *                         "user_id": 2,
 *                         "user_name": "Tim",
 *                         "role_id": 1,
 *                         "role_name": "Front end"
 *                     },
 *                     {
 *                         "id": 6,
 *                         "classroom_member_id": 6,
 *                         "user_id": 7,
 *                         "user_name": "Jon",
 *                         "role_id": 1,
 *                         "role_name": "Front end"
 *                     },
 *                     {
 *                         "id": 11,
 *                         "classroom_member_id": 3,
 *                         "user_id": 4,
 *                         "user_name": "Connor",
 *                         "role_id": 2,
 *                         "role_name": "Back end"
 *                     }
 *                  ]
 *              }
 *          ]
 *      }
 *
 *
 *  @apiErrorExample Error-Response: Not in
 *    HTTP/1.1 401 FORBIDDEN
 *    {
 *      "message": "Not your classroom",
 *      "is_password":true
 *    }
 *
 *  @apiErrorExample Error-Response:
 *    HTTP/1.1 404 FORBIDDEN
 *    {
 *      "message": "Classroom not found"
 *    }
 */
router.get("/:id", async (req, res) => {
  const id = req.params.id * 1;
  res.status(204);
  const isMember = await isMemberOrAdmin(req.user.id, id);
  if (!isMember) {
    const is_password = await Classrooms.hasPassword(id);
    res.status(401).json({ message: "Not your classroom", is_password });
  } else {
    try {
      const admins = await ClassroomAdmin.getAdminsByClassroomId(id);
      const is_admin = admins.includes(req.user.id);

      const classroom = await Classrooms.getById(id);

      if (classroom.name) {
        res.status(200).json({ is_admin, ...classroom });
      } else {
        res.status(404).json({ message: "Classroom not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
});

/**
 *  @api {get} api/classrooms/:id/projects/:classroom_project_id get classroom project
 *  @apiVersion 0.1.0
 *  @apiName getClassroomProject
 *  @apiGroup Classrooms
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiSuccess {Number} id the id of the classroom project
 *  @apiSuccess {String} name The name of the project
 *  @apiSuccess {String} description The description of the project
 *  @apiSuccess {Array} project_members A list of project member objects
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "id": 1,
 *        "name": " a project",
 *        "description": "This is a long and boring project.",
 *        "project_members": [
 *                     {
 *                         "id": 1,
 *                         "classroom_member_id": 1,
 *                         "user_id": 2,
 *                         "user_name": "Tim",
 *                         "role_id": 1,
 *                         "role_name": "Front end"
 *                     },
 *                     {
 *                         "id": 6,
 *                         "classroom_member_id": 6,
 *                         "user_id": 7,
 *                         "user_name": "Jon",
 *                         "role_id": 1,
 *                         "role_name": "Front end"
 *                     },
 *                     {
 *                         "id": 11,
 *                         "classroom_member_id": 3,
 *                         "user_id": 4,
 *                         "user_name": "Connor",
 *                         "role_id": 2,
 *                         "role_name": "Back end"
 *                     }
 *        ]
 *    }
 *  @apiErrorExample Error-Response: If no project was found
 *    HTTP/1.1 404 NOT FOUND
 *    {
 *      "message": "Classroom not found"
 *    }
 */
router.get("/:id/projects/:classroom_project_id", async (req, res) => {
  const id = req.params.id * 1;
  const isMember = await isMemberOrAdmin(req.user.id, id);
  if (!isMember) {
    res.status(400).json({ message: "Not your classroom" });
  } else {
    ClassroomProjects.getById(req.params.classroom_project_id * 1)
      .then(project => {
        res.status(200).json(project);
      })
      .catch(error => {
        res
          .status(404)
          .json({ message: "Classroom's project not found", error });
      });
  }
});
/**
 *  @api {get} api/classrooms/:id/members get clasroom members
 *  @apiVersion 0.1.0
 *  @apiName getClassroomMembers
 *  @apiGroup Classrooms
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiSuccess {Array} classroom_members A list of classroom member objects
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
 *        {
 *            "classroom_member_id": 9,
 *            "user_id": 10,
 *            "user_name": "kim"
 *        },
 *        {
 *            "classroom_member_id": 10,
 *            "user_id": 11,
 *            "user_name": "Samual"
 *        },
 *        {
 *            "classroom_member_id": 11,
 *            "user_id": 12,
 *            "user_name": "The Rockey"
 *        },
 *        {
 *            "classroom_member_id": 12,
 *            "user_id": 2,
 *            "user_name": "Tim"
 *        },
 *        {
 *            "classroom_member_id": 13,
 *            "user_id": 3,
 *            "user_name": "Jim"
 *        }
 *    ]
 */
router.get("/:id/members", restrictClassroomAdmin, async (req, res) => {
  ClassroomMembers.getMembersByClassroomId(req.params.id)
    .then(members => {
      res.status(200).json(members);
    })
    .catch(error => {
      res.status(500).json({ message: "Server error", error });
    });
});

module.exports = router;
