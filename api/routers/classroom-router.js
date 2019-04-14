const router = require("express").Router();

router.post("/", (req, res) => {
  res.json({ message: "YES" });
});

router.get("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
