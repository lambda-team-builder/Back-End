const router = require("express").Router();
const Roles = require("../../data/models/rolesModel.js");
/**
 *  @api {post} api/roles/ Create a role
 *  @apiVersion 0.1.0
 *  @apiName postRole
 *  @apiGroup Roles
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiParam {String} name Name of role
 *
 *  @apiParamExample {json} Request-Example:
 * {
 *  "name":"frontend",
 * }
 *
 *  @apiSuccess {Number} id The id of the frontend
 *  @apiSuccess {String} name Name of the role
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 CREATED
 *    {
 *      "id": "1",
 *      "name": "frontend",
 *    }
 *  @apiErrorExample Error-Response: Not all fields
 *    HTTP/1.1 401 BAD REQUEST
 *    {
 *      "message": "All fields required"
 *    }
 *  @apiErrorExample Error-Response: Name in use
 *    HTTP/1.1 403 FORBIDDEN
 *    {
 *      "message": "Role already exists"
 *    }
 */
router.post("/", (req, res) => {
  const name = req.body.name;
  if (name) {
    Roles.create(name)
      .then(id => {
        res.status(201).json({ id, name });
      })
      .catch(error => {
        if (error.errno === 19) {
          res.status(403).json({ message: "Role already exists" });
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
 *  @api {get} api/classrooms/ Get list of all roles
 *  @apiVersion 0.1.0
 *  @apiName getRoles
 *  @apiGroup Roles
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiSuccess {Array} A list of all roles
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *       [{
 *          id: 1,
 *          name: "frontend"
 *       },
 *       {
 *          id: 1,
 *         name: "backend"
 *       }]
 */
router.get("/", (req, res) => {
  Roles.get()
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(error => {
      res.status(500).json({ message: "Server error", error });
    });
});

module.exports = router;
