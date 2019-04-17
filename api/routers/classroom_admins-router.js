const router = require("express").Router();

const ClassroomAdmin = require("../../data/models/classroomAdminsModel");

router.get("/", (req, res) => {
  const user_id = req.user.id;
  ClassroomAdmin.getclassroomAdminsByUserId(user_id)
    .then(adminOfList => {
      res.status(200).json(adminOfList);
    })
    .catch(error => {
      res.status(500).json({ message: "server Error", error });
    });
});

module.exports = router;
