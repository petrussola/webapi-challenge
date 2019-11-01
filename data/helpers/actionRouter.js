// IMPORTS

const express = require("express");
const Actions = require("./actionModel");

// ROUTER

const router = express.Router();

// ENDPOINTS

// GET

router.get("/", (req, res) => {
  Actions.get()
    .then(data => {
      res.status(200).json(data);
    })
    .error(error => {
      res.status(500).json({
        message: `There was an error retrieving actions: ${error.message}`
      });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.data);
});

// POST

// DELETE

// PUT

// MIDDLEWARE

function validateActionId(req, res, next) {
  const { id } = req.params;
  Actions.get(id)
    .then(data => {
      if (data) {
        req.data = data;
        next();
      } else {
        res.status(404).json({
          message: `Action ${id} could not be found in the database`
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: `There was an error retrieving action ${id}: ${error.message}`
      });
    });
}

module.exports = router;
