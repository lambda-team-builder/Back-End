const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", async (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to our Team Builder API" });
});

server.use(function(req, res) {
  res.status(404).send("This route does not exist");
});

module.exports = server;
