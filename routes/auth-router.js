const router = require("express").Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const jwtSecret =
  process.env.JWT_SECRET || 'mellon';

const db = require("../data/dbConfig.js");
// const Users = require("../users/users-model.js"); 

router.post("/register", (req, res) => {
  let { name, email, password, user_type} = req.body;

  if (name && email && password && user_type) {
    const hash = bcrypt.hashSync(password, 14);
    password = hash;

    db("users")
      .insert(req.body)
      .then(id => {
        db("users")
          .where({ id })
          .first()
          .then(user => {
            res.status(201).json({
              message: `Registration successful!`,
              user
            });
          })
      })
      .catch(error => {
        if (error.errno === 19) {
          res.status(403).json({
            message: "Username already exists"
          });
        } else {
          res.status(500).json(error);
        }
      });
  } else {
    res.status(400).json({
      message: "All fields are required"
    });
  }
});

router.put("/login", (req, res) => {
  let { email, password } = req.body;

  if (email && password) {
    db("users")
      .where({ email })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          
          res.status(200).json({
            message: `Welcome ${user.name}, you are now logged in`,
            token
          });
        } else {
          res.status(401).json({
            message: "Incorrect password"
          });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({
      message: "Email and password are required"
    });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.email
  };
  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
