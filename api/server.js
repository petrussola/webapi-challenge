// IMPORTS

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");

// INITIALIZE EXPRESS INSTANCE

const server = express();

// MIDDLEWARE

server.use(helmet());
server.use(cors());
server.use(express.json());

// ENDPOINTS

server.get("/projects", (req, res) => {
  Projects.get()
    .then(data => {
      res.status(200).json(data);
    })
    .error(error => {
      res
        .status(500)
        .json({ message: `There was an error retrieving projects: ${error}` });
    });
});

server.get("/", (req, res) => {
  res.status(200).json({ message: "hello from server" });
});

// MIDDLEWARE

// EXPORT

module.exports = server;
