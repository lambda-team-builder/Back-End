const router = require("express").Router();
const Roles = require("../../data/models/rolesModel.js");

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

module.exports = router;
