const express = require('express');
const DB = require('../utils/db-helper');
const router = express.Router();

router.get('/', (req, res) => {
  DB.findAll('programs')
    .then((programs) => {
      res.status(200).json(programs);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  DB.findById('programs', req.params.id)
    .then((programs) => {
      res.status(200).json(programs);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  DB.create('programs', req.body)
    .then((newProgram) => {
      res.status(201).json(newProgram);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
