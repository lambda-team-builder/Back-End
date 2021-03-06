const router = require("express").Router();
//auth
const bcrypt = require("bcryptjs");
const restrictAdmin = require("../authorization/authenticate").restrictAdmin;
const restrictClassroomAdmin = require("../authorization/authenticate")
  .restrictClassroomAdmin;

const isMemberOrAdmin = require("../isMemberOrAdmin");
//models
const Classrooms = require("../../data/models/classroomsModel.js");
const ClassroomProjects = require("../../data/models/classroomProjectsModel");
const ProjectMember = require("../../data/models/projectMembersModel");
const ClassroomMember = require("../../data/models/classroomMembersModel.js");
/**
 *  @api {post} api/classrooms/ Create a classroom
 *  @apiVersion 0.1.0
 *  @apiName postClassroom
 *  @apiPermission admin
 *  @apiGroup Classrooms
 *
 *  @apiHeader {String} Authorization Admin auth token.
 *
 *  @apiParam {String} name Name of classroom
 *  @apiParam {String} password Optional password
 *
 *  @apiParamExample {json} Request-Example: No password
 * {
 *  "name":"first class room"
 * }
 *  @apiParamExample {json} Request-Example: With password
 * {
 *  "name":"first class room",
 *  "password":"1234"
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
 *  @apiErrorExample Error-Response: not admin
 *  HTTP/1.1 401 UNAUTHORIZED
 *  {
 *    message: "User does not have permission to perform this action."
 *  }
 */
// restrictAdmin add if only want admins to
router.post("/", (req, res) => {
  let { name, password } = req.body;
  if (password) {
    password = bcrypt.hashSync(password, 14);
  }
  const user_id = req.user.id;
  if (name) {
    Classrooms.create(name, user_id, password)
      .then(classroom => {
        res.status(201).json(classroom);
      })
      .catch(error => {
        res.status(403).json({ message: "Classroom name is taken", error });
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
 *  @apiPermission  classroomAdmin
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
router.post("/:id/projects", restrictClassroomAdmin, (req, res) => {
  const { project_id } = req.body;
  const classroom_id = req.params.id * 1;
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
 *  @api {post} api/classrooms/:id/projects/:classroom_project_id Delete a project from a classroom
 *  @apiVersion 0.1.0
 *  @apiName deleteClassroomProject
 *  @apiPermission  classroomAdmin
 *  @apiGroup Classrooms
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 204 NO CONTENT
 *  @apiErrorExample Error-Response: Not all fields
 *    HTTP/1.1 404 BAD REQUEST
 *    {
 *      "message": "Could not find classroom project"
 *    }
 */
router.delete(
  "/:id/projects/:classroom_project_id",
  restrictClassroomAdmin,
  async (req, res) => {
    const classroom_project_id = req.params.classroom_project_id * 1;
    const classroom_id = req.params.id * 1;
    // check if project is in this classroom

    const classroomProject = await ClassroomProjects.getById(
      classroom_project_id
    );

    if (classroomProject && classroomProject.classroom_id === classroom_id) {
      ClassroomProjects.destroy(classroom_project_id)
        .then(numDel => {
          if (numDel === 0) {
            res
              .status(404)
              .json({ message: "Could not find classroom project" });
          } else {
            res.sendStatus(204);
          }
        })
        .catch(error => {
          // add sq errors
          res.status(500).json("Server error", error);
        });
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  }
);

/**
 *  @api {post} api/classrooms/:id/classroom_projects/:classroom_project_id/project_members Create a member slot for a classroom project.
 *  @apiVersion 0.1.0
 *  @apiName postClassroomProjectMember
 *  @apiPermission  classroomAdmin
 *  @apiGroup Classrooms
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiParam {Number} role_id The role_id of the new slot for the classroom project.
 *  @apiParamExample {json} Request-Example:
 * {
 *  "role_id": 2
 * }
 *  @apiSuccess {Number} id The id of the new classroom project member slot
 *  @apiSuccess {Number} role_id The role_id for the role of the member slot
 *  @apiSuccess {Number} classroom_project_id The classroom_project_id for the classroom project that this member slot belongs to.
 *  @apiSuccess {Number} user_id Will be null, When a user takes this slot it contains that users_id
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 CREATED
 *    {
 *        "id": 1,
 *        "role_id": 1,
 *        "user_id": null,
 *        "classroom_project_id": 1
 *    }
 *  @apiErrorExample Error-Response: Not all fields
 *    HTTP/1.1 401 BAD REQUEST
 *    {
 *      "message": "All fields required"
 *    }
 */

router.post(
  "/:id/classroom_projects/:classroom_project_id/project_members",
  restrictClassroomAdmin,
  async (req, res) => {
    const role_id = req.body.role_id;
    const classroom_project_id = req.params.classroom_project_id * 1;

    if (role_id && classroom_project_id) {
      ProjectMember.create(role_id, classroom_project_id)
        .then(projectMember => {
          res.status(201).json(projectMember);
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
  }
);

/**
 *  @api {delete} api/classrooms/:id/classroom_projects/:classroom_project_id/project_members/:project_member_id Delete a member slot
 *  @apiVersion 0.1.0
 *  @apiName deleteClassroomProjectMember
 *  @apiPermission  classroomAdmin
 *  @apiGroup Classrooms
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 204 NO CONTENT
 *
 *  @apiErrorExample Error-Response: Not all fields
 *    HTTP/1.1 404 NOT FOUND
 *    {
 *      "message": "Project slot could not be found"
 *    }
 */

router.delete(
  "/:id/classroom_projects/:classroom_project_id/project_members/:project_member_id",
  restrictClassroomAdmin,
  async (req, res) => {
    const project_member_id = req.params.project_member_id;
    ProjectMember.destroy(project_member_id)
      .then(numDestroyed => {
        if (numDestroyed === 0) {
          res.status(404).json({ message: "Project slot could not be found" });
        } else {
          res.sendStatus(204);
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Server error",
          error
        });
      });
  }
);

/**
 *  @api {put} api/classrooms/:id Edit classroom name
 *  @apiVersion 0.1.0
 *  @apiName putClassroom
 *  @apiPermission  classroomAdmin
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
router.put("/:id", restrictClassroomAdmin, async (req, res) => {
  try {
    if (req.body.name) {
      const classroomUpdated = await Classrooms.update(
        req.params.id * 1,
        req.body
      );

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

/**
 *  @api {put} api/classrooms/:id/join Join classroom
 *  @apiVersion 0.1.0
 *  @apiName putClassroomJoin
 *  @apiGroup Classrooms
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiParam {String} password If classroom has password it is required to join
 *  @apiParamExample {json} Request-Example:
 * {
 *  "password": "1234"
 * }
 *  @apiParamExample {json} Request-Example: No password
 * {
 *  "password": null
 * }
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 204 NO CONTENT
 *  @apiErrorExample Error-Response: Bad password
 *    HTTP/1.1 401 BAD REQUEST
 *    {
 *      "message": "Bad credentials"
 *    }
 *  @apiErrorExample Error-Response: If no classroom was found
 *    HTTP/1.1 404 NOT FOUND
 *    {
 *      "message": "Classroom not found"
 *    }
 *  @apiErrorExample Error-Response: Already member
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "Aleady member of classroom"
 *    }
 */

router.put("/:id/join", async (req, res) => {
  const submittedPassword = req.body.password;
  const id = req.params.id * 1;
  // get the classroom and check if it has a password
  const classroom = await Classrooms.get(id);

  if (
    !classroom.password ||
    bcrypt.compareSync(submittedPassword, classroom.password)
  ) {
    ClassroomMember.join(id, req.user.id)
      .then(numJoined => {
        if (numJoined) {
          res.sendStatus(204);
        } else {
          res.status(404).json({ message: "Classroom not found" });
        }
      })
      .catch(error => {
        res.status(400).json({ message: "Aleady member of classroom" });
      });
  } else {
    // not valid login
    res.status(401).json({ message: "Bad credentials" });
  }
});

/**
 *  @api {put} api/classrooms/:id/leave Leave classroom
 *  @apiVersion 0.1.0
 *  @apiName putClassroomLeave
 *  @apiGroup Classrooms
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 204 NO CONTENT
 *  @apiErrorExample Error-Response: If no classroom was found
 *    HTTP/1.1 404 NOT FOUND
 *    {
 *      "message": "Classroom not found"
 *    }
 *  @apiErrorExample Error-Response: Already member
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "Aleady member of classroom"
 *    }
 */

router.put("/:id/leave", async (req, res) => {
  ClassroomMember.leave(req.user.id, req.params.id * 1)
    .then(numDel => {
      if (numDel) {
        res.sendStatus(204);
      } else {
        res
          .status(404)
          .json({ message: "User not in classroom", error: numDel });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Server Error", error });
    });
});
/**
 *  @api {put} api/classrooms/:id/password Update classroom password
 *  @apiVersion 0.1.0
 *  @apiName putClassroomJoin
 *  @apiPermission classroom admin
 *  @apiGroup Classrooms
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiParam {String} password New password
 *  @apiParamExample {json} Request-Example:
 * {
 *  "password": "1234"
 * }
 *  @apiParamExample {json} Request-Example: No password
 * {
 *  "password": null
 * }
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 204 NO CONTENT
 *  @apiErrorExample Error-Response: If no classroom was found
 *    HTTP/1.1 404 NOT FOUND
 *    {
 *      "message": "Classroom cannot be found"
 *    }
 */
router.put("/:id/password", restrictClassroomAdmin, (req, res) => {
  let password = req.body.password;
  if (password) {
    password = bcrypt.hashSync(password, 14);
  }
  Classrooms.update(req.params.id * 1, {
    password: password ? password : null
  })
    .then(numUpdated => {
      if (numUpdated) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: "Classroom cannot be found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Server Error" });
    });
});

module.exports = router;
