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
    .json({ message: "Welcome to Testing Sprint Challenge - Lambda 2019" });
});

module.exports = server;
