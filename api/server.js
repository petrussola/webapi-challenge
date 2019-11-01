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
      res.status(500).json({
        message: `There was an error retrieving projects: ${error.message}`
      });
    });
});

server.get("/projects/:id", validateProject, (req, res) => {
  res.status(200).json(req.data);
});

server.get("/", (req, res) => {
  res.status(200).json({ message: "hello from server" });
});

// MIDDLEWARE

function validateProject(req, res, next) {
  const { id } = req.params;
  Projects.get(id)
    .then(data => {
      if (data) {
        req.data = data;
        next();
      } else {
        res.status(404).json({ message: `Project ${id} could not be found in the database` });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: `There was an error retrieving project ${id}: ${error.message}`
      });
    });
}

// EXPORT

module.exports = server;
