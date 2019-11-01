// IMPORTS

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

// INITIALIZE EXPRESS INSTANCE

const server = express();

// MIDDLEWARE

server.use(helmet());
server.use(cors());
server.use(express.json());

// ENDPOINTS

server.get("/", (req, res) => {
  res.status(200).json({ message: "hello from server" });
});

// EXPORT

module.exports = server;
