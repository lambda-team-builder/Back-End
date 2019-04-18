const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//mw
const restrict = require("./authorization/authenticate.js").restrict;
const restrictAdmin = require("./authorization/authenticate.js").restrictAdmin;
// Routers
const authRouter = require("./routers/auth-router.js");
const classroomRouter = require("./routers/classroom-router.js");
const getClassroomRouter = require("./routers/get-classroom-router.js");
const projectRouter = require("./routers/project-router.js");
const roleRouter = require("./routers/roles-router.js");
const projectMemberRouter = require("./routers/project_members-router.js");
const classroomAdminsRouter = require("./routers/classroom_admins-router.js");
const classroomMemberRouter = require("./routers/classroom_member-router.js");
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({ message: "Welcome to our Team Builder API" });
});

// Route Handlers:
server.use("/api/auth", authRouter);
server.use("/api/classrooms", restrict, classroomRouter);
server.use("/api/classrooms", restrict, getClassroomRouter);
server.use("/api/projects", restrict, projectRouter);
server.use("/api/roles", restrictAdmin, roleRouter);
server.use("/api/project_members", restrict, projectMemberRouter);
server.use("/api/classroom_admins", restrict, classroomAdminsRouter);
server.use("/api/classroom_members", restrict, classroomMemberRouter);
server.use(function(req, res) {
  res.status(404).send("This route does not exist");
});

module.exports = server;
