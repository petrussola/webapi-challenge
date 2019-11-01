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

router.post("/", validateAction, (req, res) => {
  Actions.insert(req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message: `There was an error posting the action: ${error.message}`
      });
    });
});

// DELETE

router.delete("/:id", validateActionId, (req, res) => {
  Actions.remove(req.data.id)
    .then(data => {
      res.status(200).json(req.data);
    })
    .catch(error => {
      res.status(500).json({
        message: `Action ${req.data.id} could not be deleted: ${error.message}`
      });
    });
});

// PUT

router.put("/:id", [validateActionId, validateAction], (req, res) => {
  Actions.update(req.data.id, req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message: `Action ${req.data.id} could not be edited: ${error.message}`
      });
    });
});

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

function validateAction(req, res, next) {
  if (Object.keys(req.body).length) {
    if (req.body.project_id && req.body.description && req.body.notes) {
      next();
    } else {
      res
        .status(400)
        .json({ message: "Project id, description and name required" });
    }
  } else {
    res
      .status(400)
      .json({ message: "Project id, description and name required" });
  }
}

module.exports = router;
