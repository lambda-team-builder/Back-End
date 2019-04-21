const router = require("express").Router();

const restrictAdmin = require("../authorization/authenticate").restrictAdmin;

const Projects = require("../../data/models/projectsModel.js");
const ProjectMembers = require("../../data/models/projectMembersModel.js");
/**
 *  @api {post} api/projects/ Create a project
 *  @apiVersion 0.1.0
 *  @apiName postProjects
 *  @apiPermission  Admin
 *  @apiGroup Projects
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiParam {String} name Name of project
 *  @apiParam {String} description The description of the project
 *
 *  @apiParamExample {json} Request-Example:
 * {
 *  "name":"this project",
 *  "description": "This is a long and boring project."
 * }
 *
 *  @apiSuccess {Number} id The id of the project
 *  @apiSuccess {String} name Name of the project
 *  @apiSuccess {Array} description The description of the project
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 CREATED
 *    {
 *      "id": 1,
 *      "name":"this project",
 *      "description": "This is a long and boring project."
 *    }
 *  @apiErrorExample Error-Response: Not all fields
 *    HTTP/1.1 401 BAD REQUEST
 *    {
 *      "message": "All fields required"
 *    }
 *  @apiErrorExample Error-Response: Name in use
 *    HTTP/1.1 403 FORBIDDEN
 *    {
 *      "message": "Project already exists"
 *    }
 */
//restrictAdmin,
router.post("/", (req, res) => {
  const { name, description } = req.body;
  if (name && description) {
    Projects.create(name, description)
      .then(id => {
        res.status(201).json({ name, description, id });
      })
      .catch(error => {
        if (error.errno === 19) {
          res.status(403).json({ message: "Project already exists" });
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
 *  @api {put} api/projects/ Update a project
 *  @apiVersion 0.1.0
 *  @apiName putProject
 *  @apiPermission  Admin
 *  @apiGroup Projects
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiParam {String} name Name of project
 *  @apiParam {String} description The description of the project
 *
 *  @apiParamExample {json} Request-Example: Update both
 *  {
 *   "name":"this project",
 *   "description": "This is a long and boring project."
 *  }
 *  @apiParamExample {json} Request-Example: Update name
 *  {
 *   "name":"this project"
 *  }
 *  @apiParamExample {json} Request-Example: Update description
 *  {
 *   "description": "This is a long and boring project."
 *  }
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 204 No Content
 *
 *  @apiErrorExample Error-Response: Not all fields
 *    HTTP/1.1 401 BAD REQUEST
 *    {
 *      "message": "At Least one field is required"
 *    }
 *  @apiErrorExample Error-Response: Name in use
 *    HTTP/1.1 404 NOT FOUND
 *    {
 *      "message": "Project does not exist"
 *    }
 */

router.put("/:id", restrictAdmin, (req, res) => {
  const { name, description } = req.body;
  const id = req.params.id * 1;
  if (name || description) {
    updateObj = {};
    if (name) {
      updateObj.name = name;
    }
    if (description) {
      updateObj.description = description;
    }
    Projects.update(updateObj, id)
      .then(numUpdate => {
        if (numUpdate === 0) {
          res.status(404).json({ message: "Project does not exist" });
        } else {
          res.sendStatus(204);
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Server Error", error });
      });
  } else {
    res.status(401).json({
      message: "At Least one field is required"
    });
  }
});

/**
 *  @api {get} api/projects/ Get all projects
 *  @apiVersion 0.1.0
 *  @apiName getProjects
 *  @apiGroup Projects
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *
 *  @apiSuccess {Array} projects A array of projects
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "id": "1",
 *        "name":"first project",
 *        "description": "This is a long and boring project."
 *      },
 *       {
 *        "id": "2",
 *        "name":"second project",
 *        "description": "This is a sort and fun project."
 *      }
 *    ]
 *  @apiErrorExample Error-Response: Unauthorized
 *    HTTP/1.1 403 FORBIDDEN
 *    {
 *      "message": "No valid credentials provided"
 *    }
 */
router.get("/", (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({ message: "Server error", error });
    });
});
/**
 *  @api {get} api/projects/mine Get users projects
 *  @apiVersion 0.1.0
 *  @apiName getUsersProjects
 *  @apiGroup Projects
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *
 *  @apiSuccess {Array} projects A array of projects
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
 *        {
 *            "project_name": "NBA Stats",
 *            "classroom_project_id": 2,
 *            "classroom_id": 1,
 *            "classroom_name": "build week 1",
 *            "role_name": "Front end"
 *        },
 *        {
 *            "project_name": "Photo Gallery",
 *            "classroom_project_id": 5,
 *            "classroom_id": 1,
 *            "classroom_name": "build week 1",
 *            "role_name": "Back end"
 *        },
 *        {
 *            "project_name": "Game Room",
 *            "classroom_project_id": 8,
 *            "classroom_id": 1,
 *            "classroom_name": "build week 1",
 *            "role_name": "Back end"
 *        },
 *        {
 *            "project_name": "Living Big",
 *            "classroom_project_id": 9,
 *            "classroom_id": 1,
 *            "classroom_name": "build week 1",
 *            "role_name": "Back end"
 *        },
 *        {
 *            "project_name": "Team builder",
 *            "classroom_project_id": 12,
 *            "classroom_id": 2,
 *            "classroom_name": "build week 2",
 *            "role_name": "UI"
 *        },
 *        {
 *            "project_name": "Team builder",
 *            "classroom_project_id": 10,
 *            "classroom_id": 2,
 *            "classroom_name": "build week 2",
 *            "role_name": "UI"
 *        }
 *    ]
 *  @apiErrorExample Error-Response: Unauthorized
 *    HTTP/1.1 403 FORBIDDEN
 *    {
 *      "message": "No valid credentials provided"
 *    }
 */
router.get("/mine", (req, res) => {
  ProjectMembers.getProjectsByUserId(req.user.id)
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({ message: "Server Error", error });
    });
});

module.exports = router;
