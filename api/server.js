// IMPORTS

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const projectRouter = require("../data/helpers/projectRouter");

// INITIALIZE EXPRESS INSTANCE

const server = express();

// MIDDLEWARE

server.use(helmet());
server.use(cors());
server.use(express.json());

// ROUTERS

server.use("/projects", projectRouter);

// EXPORT

module.exports = server;
