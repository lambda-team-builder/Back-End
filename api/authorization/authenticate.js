const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "mellon";

const db = require("../../data/dbConfig.js");

const ClassroomAdmin = require("../../data/models/classroomAdminsModel");

module.exports = {
  restrict,
  generateToken,
  restrictAdmin,
  restrictClassroomAdmin
};

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

async function restrictAdmin(req, res, next) {
  if (req.header("Authorization")) {
    if (!req.user) {
      // needs basic auth
      const token = req.header("Authorization");
      await jwt.verify(token, jwtSecret, async (error, decocedToken) => {
        if (error) {
          res.status(403).json({ message: "No valid credentials provided" });
        } else {
          const id = decocedToken.subject;
          await db("users")
            .where({ id })
            .first()
            .then(user => {
              req.user = user;
            })
            .catch(error => {
              res
                .status(403)
                .json({ message: "No valid credentials provided" });
            });
        }
      });
    }
    if (req.user) {
      // need to check if admin
      if (req.user.user_type_id === 1) {
        next();
      } else {
        res.status(401).json({
          message: "User does not have permission to perform this action."
        });
      }
    }
  } else {
    res.status(403).json({ message: "No valid credentials provided", error });
  }
}

// after athenticate route and only on /api/classrooms/:id
function restrictClassroomAdmin(req, res, next) {
  const user_id = req.user.id;
  const classroom_id = req.params.id * 1;
  ClassroomAdmin.getAdminsByClassroomId(classroom_id)
    .then(user_ids => {
      if (user_ids.length === 0) {
        res.status(404).json({ message: "Classroom does not exist" });
      } else if (user_ids.includes(user_id)) {
        next();
      } else {
        res.status(401).json({ message: "Not a admin for this classroom" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Server Error", error });
    });
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
