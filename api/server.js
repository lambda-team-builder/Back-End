const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// Routers
const authRouter = require("../routers/auth-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", async (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to our Team Builder API" });
});

// Route Handlers:
server.use("/api/auth", authRouter);
server.use(function(req, res) {
  res.status(404).send("This route does not exist");
});

module.exports = server;
