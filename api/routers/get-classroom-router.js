const router = require("express").Router();

//models
const Classrooms = require("../../data/models/classroomsModel.js");
const ClassroomProjects = require("../../data/models/classroomProjectsModel");

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
 *         name: "Build Week 2"
 *       },
 *       {
 *          id: 2,
 *         name: "Build Week 2"
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
 *  @apiVersion 0.2.0
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
 *          "projects": [
 *              {
 *                  "id": 1,
 *                  "name": " a project",
 *                  "description": "This is a long and boring project.",
 *                  "roles": [
 *                      {
 *                          "id": 1,
 *                          "user_id": 1,
 *                          "user_name": "admin",
 *                          "role_name": "Lead"
 *                      },
 *                      {
 *                          "id": 2,
 *                          "user_id": null,
 *                          "user_name": null,
 *                          "role_name": "Backend"
 *                      },
 *                      {
 *                          "id": 3,
 *                          "user_id": 2,
 *                          "user_name": "connor",
 *                          "role_name": "Backend"
 *                      },
 *                      {
 *                          "id": 4,
 *                          "user_id": null,
 *                          "user_name": null,
 *                          "role_name": "Lead"
 *                      }
 *                  ]
 *              }
 *          ]
 *      }
 *
 *
 *  @apiErrorExample Error-Response:
 *    HTTP/1.1 404 FORBIDDEN
 *    {
 *      "message": "Classroom not found"
 *    }
 */
router.get("/:id", async (req, res) => {
  try {
    const classroom = await Classrooms.getById(req.params.id);

    if (classroom.name) {
      res.status(200).json(classroom);
    } else {
      res.status(404).json({ message: "Classroom not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
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
 *            {
 *                "id": 1,
 *                "user_id": 1,
 *                "user_name": "admin",
 *                "role_name": "Lead"
 *            },
 *            {
 *                "id": 2,
 *                "user_id": null,
 *                "user_name": null,
 *                "role_name": "Backend"
 *            },
 *            {
 *                "id": 3,
 *                "user_id": 2,
 *                "user_name": "connor",
 *                "role_name": "Backend"
 *            },
 *            {
 *                "id": 4,
 *                "user_id": null,
 *                "user_name": null,
 *                "role_name": "Lead"
 *            }
 *        ]
 *    }
 *  @apiErrorExample Error-Response: If no project was found
 *    HTTP/1.1 404 NOT FOUND
 *    {
 *      "message": "Classroom not found"
 *    }
 */
router.get("/:id/projects/:classroom_project_id", (req, res) => {
  ClassroomProjects.getById(req.params.classroom_project_id * 1)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res.status(404).json({ message: "Classroom's project not found", error });
    });
});

module.exports = router;
