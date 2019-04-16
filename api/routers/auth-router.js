const router = require("express").Router();
const bcrypt = require("bcryptjs");

const generateToken = require("../authorization/authenticate.js").generateToken;

const restrict = require("../authorization/authenticate").restrict;

const db = require("../../data/dbConfig.js");
const Users = require("../../data/models/usersModel.js");

// const Users = require("../users/users-model.js");

/**
 *  @api {post} api/auth/register Register a user
 *  @apiVersion 0.1.0
 *  @apiName registerUser
 *  @apiGroup User
 *
 *  @apiParam {String} name Name of user
 *  @apiParam {String} email Email of user
 *  @apiParam {String} password Password of user
 *
 *  @apiParamExample {json} Request-Example:
 * {
 *  "name":"connor",
 *  "email":"connor@gmail.com",
 *  "password": "1234",
 * }
 *
 *  @apiSuccess {Number} id The id of the user
 *  @apiSuccess {String} name Name of the user
 *  @apiSuccess {String} email Email of the user
 *  @apiSuccess {String} token Auth Token
 *  @apiSuccess {Object} user_type the type of user
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 CREATED
 *    {
 *      "name": "connor",
 *      "email": "connor@hotmail.com",
 *      "user_type": "{
 *        "id": 2,
 *         "name": "student"
 *       },",
 *      "token" : "hdf78623rhfkjsdhkf"
 *    }
 *  @apiErrorExample Error-Response: Not all fields
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "All fields required"
 *    }
 *  @apiErrorExample Error-Response: Email in use
 *    HTTP/1.1 403 FORBIDDEN
 *    {
 *      "message": "Email is already in use"
 *    }
 */

router.post("/register", async (req, res) => {
  let { name, email, password } = req.body;
  let user_type_id;

  if (req.body.user_type_id) {
    user_type_id = req.body.user_type_id;
  } else {
    user_type_id = 2;
  }

  if (name && email && password && user_type_id) {
    const hash = bcrypt.hashSync(password, 14);
    password = hash;
    const userPromise = Users.create(name, email, user_type_id, password);
    const user_typePromise = Users.getUserTypeById(user_type_id);

    Promise.all([userPromise, user_typePromise])
      .then(([user, user_type]) => {
        // Token only needs to be given after login no? Let me know
        const token = generateToken(user);
        res.status(201).json({
          ...user,
          user_type,
          token
        });
      })
      .catch(error => {
        res.status(403).json({
          message: "Email is already in use",
          error
        });
      });
  } else {
    res.status(400).json({
      message: "All fields are required"
    });
  }
});

/**
 *  @api {put} api/auth/login Login a user
 *  @apiVersion 0.1.0
 *  @apiName loginUser
 *  @apiGroup User
 *
 *  @apiParam {String} email Email of user
 *  @apiParam {String} password Password of user
 *
 *  @apiParamExample {json} Request-Example:
 * {
 *  "email":"connor@gmail.com",
 *  "password":"1234"
 * }
 *
 *  @apiSuccess {Number} id The id of the user
 *  @apiSuccess {String} name Name of the user
 *  @apiSuccess {String} email Email of the user
 *  @apiSuccess {String} user_type The type of user
 *  @apiSuccess {String} token The auth token
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 CREATED
 *    {
 *      "name": "connor",
 *      "email": "connor@hotmail.com",
 *      "user_type": "student",
 *      "token": "GHFHJUI#Y$SAHDJKHA"
 *    }
 *  @apiErrorExample Error-Response: Bad credentials
 *    HTTP/1.1 401 UNAUTHORIZED
 *    {
 *      "message": "Bad credentials"
 *    }
 *  @apiErrorExample Error-Response: Missing credentials
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "Email and password are required"
 *    }
 */

router.put("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    if (email && password) {
      const user = await Users.getByEmail(email);

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        const user_type = await Users.getUserTypeById(user.user_type_id);
        res.status(200).json({
          id: user.id,
          name: user.name,
          email: user.email,
          user_type,
          token
        });
      } else {
        res.status(401).json({
          message: "Bad credentials"
        });
      }
    } else {
      res.status(400).json({
        message: "Email and password are required"
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 *  @api {get} api/auth/refresh Refresh JWT
 *  @apiVersion 0.1.0
 *  @apiName refreshUser
 *  @apiGroup User
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *
 *  @apiSuccess {String} token The auth token
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "token": "GHFHJUI#Y$SAHDJKHA"
 *    }
 *  @apiErrorExample Error-Response: Bad credentials
 *    HTTP/1.1 403 RESTRICTED
 *    {
 *      "message": "No valid credentials provided"
 *    }
 */

router.get("/refresh", restrict, async (req, res) => {
  const token = generateToken(req.user);
  if (token) {
    res.status(200).json({ token });
  } else {
    res.status(500).json("Show Connor this error", error);
  }
});

/**
 *  @api {put} api/auth/password Update users password
 *  @apiVersion 0.1.0
 *  @apiName updatePasswordUser
 *  @apiGroup User
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiParam {String} email Email of user
 *  @apiParam {String} password Current password of user
 *  @apiParam {String} new_password New password of user
 *
 *  @apiParamExample {json} Request-Example:
 * {
 *  "email":"connor@gmail.com",
 *  "password": "1234",
 *  "new_password": "12345"
 * }
 *
 *  @apiSuccess {String} token Auth Token
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 CREATED
 *    {
 *      "token" : "hdf78623rhfkjsdhkf"
 *    }
 *  @apiErrorExample Error-Response: Not all fields
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "Email, password and new password are required"
 *    }
 *  @apiErrorExample Error-Response: Cannot login
 *    HTTP/1.1 401 UNAUTHORIZED
 *    {
 *      "message": "Bad credentials"
 *    }
 */

router.put("/password", restrict, async (req, res) => {
  const { email, password, new_password } = req.body;

  if (email && password && new_password) {
    try {
      // check if old password is right
      if (req.user && bcrypt.compareSync(password, req.user.password)) {
        //Good to update password
        const hashPassword = bcrypt.hashSync(new_password, 14);
        const numUpdated = await Users.updatePassword(
          req.user.id,
          hashPassword
        );
        if (numUpdated) {
          const token = generateToken(req.user);
          res.status(200).json({ token });
        } else {
          res.status(500).json({ message: "Failed to update" });
        }
      } else {
        res.status(401).json({
          message: "Bad credentials"
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(400).json({
      message: "Email, password and new password are required"
    });
  }
});

module.exports = router;
