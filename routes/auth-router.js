const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("../api/secrets");
// const Users = require("../users/users-model.js"); 

router.post("/register", async (req, res) => {

});

router.put("/login", async (req, res) => {

});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
