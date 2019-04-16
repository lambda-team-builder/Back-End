const router = require("express").Router();
const Roles = require("../../data/models/rolesModel.js");
/**
 *  @api {post} api/roles/ Create a role
 *  @apiVersion 0.1.0
 *  @apiName postRole
 *  @apiPermission  Admin
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
 *  @apiPermission  Admin
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

/**
 *  @api {put} api/roles/:id Update a role
 *  @apiVersion 0.1.0
 *  @apiName putRole
 *  @apiPermission  Admin
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
 *    HTTP/1.1 200 OK
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
 *      "message": "Cannot update because that role already exists"
 *    }
 *  @apiErrorExample Error-Response: Not found
 *    HTTP/1.1 404 NOT FOUND
 *    {
 *      "message": "Role not found"
 *    }
 */

router.put("/:id", (req, res) => {
  const name = req.body.name;
  const id = req.params.id * 1;
  if (name) {
    Roles.update(id, name)
      .then(updated => {
        if (updated) {
          res.status(200).json({ id, name });
        } else {
          res.status(404).json({ message: "Role not found" });
        }
      })
      .catch(error => {
        res
          .status(400)
          .json({
            message: "Cannot update because that role already exists",
            error
          });
      });
  } else {
    res.status(401).json({ message: "All fields required" });
  }
});

module.exports = router;
