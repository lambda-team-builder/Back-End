const router = require("express").Router();
const bcrypt = require("bcryptjs");

const generateToken = require("../authorization/authenticate.js").generateToken;

const db = require("../../data/dbConfig.js");
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
 *  @apiParam {Number} user_type_id Id of the user type
 *
 *  @apiParamExample {json} Request-Example:
 * {
 *  "name":"connor",
 *  "email":"connor@gmail.com",
 *  "password": "1234",
 *  "user_type_id": 2
 * }
 *
 *  @apiSuccess {Number} id The id of the user
 *  @apiSuccess {String} name Name of the user
 *  @apiSuccess {String} email Email of the user
 *  @apiSuccess {String} user_type The type of user
 *  @apiSuccess {String} token Auth Token
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 CREATED
 *    {
 *      "name": "connor",
 *      "email": "connor@hotmail.com",
 *      "user_type": "student",
 *      "token" : "hdf78623rhfkjsdhkf"
 *    }
 *  @apiErrorExample Error-Response: Not all fields
 *    HTTP/1.1 401 BAD REQUEST
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
  let { name, email, password, user_type_id } = req.body;

  try {
    if (name && email && password && user_type_id) {
      const hash = bcrypt.hashSync(password, 14);
      password = hash;

      const [id] = await db("users").insert({
        name,
        email,
        user_type_id,
        password
      });
      const user = await db("users")
        .where({ id })
        .first();
      const token = generateToken(user);
      const user_type = await db("user_types")
        .where({ id: user.user_type_id })
        .first();

      res.status(201).json({
        id: user.id,
        name,
        email,
        user_type,
        token
      });
    } else {
      res.status(400).json({
        message: "All fields are required"
      });
    }
  } catch (error) {
    if (error.errno === 19) {
      res.status(403).json({
        message: "Email is already in use"
      });
    } else {
      res.status(500).json(error);
    }
  }
});

/**
 *  @api {post} api/auth/login Login a user
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
      const user = await db("users")
        .where({ email })
        .first();

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        const user_type = await db("user_types")
          .where({ id: user.user_type_id })
          .first();
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

module.exports = router;
