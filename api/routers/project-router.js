const router = require("express").Router();

const Projects = require("../../data/models/projectsModel.js");
/**
 *  @api {post} api/projects/ Create a project
 *  @apiVersion 0.1.0
 *  @apiName postProjects
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
 *      "id": "1",
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

router.get("/", (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({ message: "Server error", error });
    });
});

module.exports = router;
