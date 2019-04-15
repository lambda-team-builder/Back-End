const router = require("express").Router();

const Classrooms = require("../../data/models/classroomsModel.js");
const ClassroomProjects = require("../../data/models/classroomProjectsModel");
/**
 *  @api {post} api/classrooms/ Create a classroom
 *  @apiVersion 0.1.0
 *  @apiName postClassroom
 *  @apiGroup Classrooms
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiParam {String} name Name of classroom
 *
 *  @apiParamExample {json} Request-Example:
 * {
 *  "name":"first class room",
 * }
 *
 *  @apiSuccess {Number} id The id of the classroom
 *  @apiSuccess {String} name Name of the classroom
 *  @apiSuccess {Array} classroom_admin_user_ids List of group's admins by id
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 CREATED
 *    {
 *      "id": "1",
 *      "name": "first class room",
 *      "classroom_admin_user_ids": [2]
 *    }
 *  @apiErrorExample Error-Response: Not all fields
 *    HTTP/1.1 401 BAD REQUEST
 *    {
 *      "message": "All fields required"
 *    }
 *  @apiErrorExample Error-Response: Name in use
 *    HTTP/1.1 403 FORBIDDEN
 *    {
 *      "message": "classroom name is already in use"
 *    }
 */
router.post("/", (req, res) => {
  const { name } = req.body;
  const user_id = req.user.id;
  if (name) {
    Classrooms.create(name, user_id)
      .then(classroom => {
        res.status(201).json(classroom);
      })
      .catch(error => {
        if (error.errno === 19) {
          res.status(403).json({ message: "Classroom name is taken" });
        } else {
          res.status(500).json({ message: "Server error", error });
        }
      });
  } else {
    res.status(401).json({
      message: "All fields are required"
    });
  }
});
/**
 *  @api {post} api/classrooms/:id/projects Add a project to a classroom
 *  @apiVersion 0.1.0
 *  @apiName postClassroomProject
 *  @apiGroup Classrooms
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiParam {Number} project_id The project_id of the project to get added to classroom
 *  @apiParamExample {json} Request-Example:
 * {
 *  "project_id": 2
 * }
 *  @apiSuccess {Number} id The id of the classroom project
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 CREATED
 *    {
 *      "id": 2
 *    }
 *  @apiErrorExample Error-Response: Not all fields
 *    HTTP/1.1 401 BAD REQUEST
 *    {
 *      "message": "All fields required"
 *    }
 */
router.post("/:id/projects", (req, res) => {
  const { project_id } = req.body;
  const classroom_id = req.params.id;
  if (project_id && classroom_id) {
    ClassroomProjects.create(project_id, classroom_id)
      .then(classroomProject => {
        res.status(201).json(classroomProject);
      })
      .catch(error => {
        // add sq errors

        res.status(500).json("Server error");
      });
  } else {
    res.status(401).json("All fields required");
  }
});
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
 *          id: 1,
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
 *  @api {get} api/classrooms/:id Find classroom by ID
 *  @apiVersion 0.1.0
 *  @apiName getClassroom
 *  @apiGroup Classrooms
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiSuccess {Object} The requested classroom
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *      [{
 *         id: 1,
 *         name: "Build Week 2",
 *      }]
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

    if (classroom) {
      res.status(200).json(classroom);
    } else {
      res.status(404).json({ message: "Classroom not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
/**
 *  @api {put} api/classrooms/:id Edit classroom name
 *  @apiVersion 0.1.0
 *  @apiName putClassroom
 *  @apiGroup Classrooms
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiParam {String} name New classroom name
 *  @apiParamExample {json} Request-Example:
 * {
 *  "name": "Build Week 5"
 * }
 *  @apiSuccess {Object} The neww classroom
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 CREATED
 *    {
 *      "id": 2,
 *      "name": "Build Week 5"
 *    }
 *  @apiErrorExample Error-Response: If missing name
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "Classroom name required"
 *    }
 *  @apiErrorExample Error-Response: If no classroom was found
 *    HTTP/1.1 404 NOT FOUND
 *    {
 *      "message": "Classroom not found"
 *    }
 */
router.put("/:id", async (req, res) => {
  try {
    if (req.body.name) {
      const classroomUpdated = await Classrooms.update(req.params.id, req.body);

      if (classroomUpdated) {
        const classroom = await Classrooms.getById(req.params.id);

        res.status(200).json(classroom);
      } else {
        res.status(404).json({ message: "Classroom not found" });
      }
    } else {
      res.status(400).json({
        message: "Classroom name required"
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/:id", (req, res) => {});

module.exports = router;
