// IMPORTS
const express = require("express");
const Projects = require("./projectModel");

// INSTANTIATE EXPRESS
const router = express.Router();

// ENDPOINTS

// GET

router.get("/", (req, res) => {
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

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.data);
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  Projects.getProjectActions(req.data.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res
        .status(400)
        .json({ message: `Could not retrieve actions: ${error.message}` });
    });
});

// POST

router.post("/", validateProject, (req, res) => {
  Projects.insert(req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(400).json({
        message: `There was an error posting the project: ${error.message}`
      });
    });
});

// DELETE
router.delete("/:id", validateProjectId, (req, res) => {
  Projects.remove(req.data.id)
    .then(data => {
      res.status(200).json(req.data);
    })
    .catch(error => {
      res.status(500).json({
        message: `Project ${req.data.id} could not be deleted: ${error.message}`
      });
    });
});

// PUT

router.put("/:id", [validateProjectId, validateProject], (req, res) => {
  Projects.update(req.data.id, req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({
          message: `Project ${req.data.id} could not be edited: ${error.message}`
        });
    });
});

// CATCHALL

router.get("/", (req, res) => {
  res.status(200).json({ message: "hello from server" });
});

// MIDDLEWARE

function validateProjectId(req, res, next) {
  const { id } = req.params;
  Projects.get(id)
    .then(data => {
      if (data) {
        req.data = data;
        next();
      } else {
        res.status(404).json({
          message: `Project ${id} could not be found in the database`
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: `There was an error retrieving project ${id}: ${error.message}`
      });
    });
}

function validateProject(req, res, next) {
  if (Object.keys(req.body).length) {
    if (req.body.name && req.body.description) {
      next();
    } else {
      res
        .status(400)
        .json({ message: "Project and name description required" });
    }
  } else {
    res.status(400).json({ message: "Project and name description required" });
  }
}

module.exports = router;
