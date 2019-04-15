const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "mellon";

const db = require("../../data/dbConfig.js");

module.exports = { restrict, generateToken };

function restrict(req, res, next) {
  const token = req.header("Authorization");
  if (token) {
    jwt.verify(token, jwtSecret, (error, decocedToken) => {
      if (error) {
        res.status(403).json({ message: "No valid credentials provided" });
      } else {
        const id = decocedToken.subject;
        db("users")
          .where({ id })
          .first()
          .then(user => {
            req.user = user;
            next();
          })
          .catch(error => {
            res
              .status(403)
              .json({ message: "No valid credentials provided", error });
          });
      }
    });
  } else {
    res.status(403).json({ message: "No valid credentials provided" });
  }
}

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
