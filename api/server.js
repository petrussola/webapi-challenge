// IMPORTS

const express = require('express');
const cors = require('cors');

// INITIALIZE EXPRESS INSTANCE

const server = express();

// MIDDLEWARE

server.use(cors());
server.use(express.json());

// ENDPOINTS

