const router = require("express").Router();

const Classrooms = require("../../data/models/classroomsModel.js");

router.post("/", (req, res) => {
  const { name } = req.body;
  const user_id = req.user.id;
  if (name) {
    Classrooms.create(name, user_id)
      .then(classroom => {
        res.status(201).json(classroom);
      })
      .catch(error => {
        if (error.errno === 19) {
          res.status(403).json({ message: "Classroom name is taken" });
        } else {
          res.status(500).json({ message: "Server error", error });
        }
      });
  } else {
    res.status(400).json({
      message: "All fields are required"
    });
  }
});

router.get("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
