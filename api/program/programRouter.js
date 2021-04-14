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

router.post('/name', (req, res) => {
  const { name } = req.body;

  DB.findBy('programs', { name: name })
    .then((program) => {
      res.status(200).json(program);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/type', (req, res) => {
  const { type } = req.body;

  DB.findBy('programs', { type: type })
    .then((program) => {
      res.status(200).json(program);
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

router.put('/:id', (req, res) => {
  DB.update('programs', req.params.id, req.body)
    .then((editedProgram) => {
      res.status(200).json(editedProgram);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  DB.remove('programs', id)
    .then(() => {
      res.status(200).json({ message: `Program ${id} has been removed` });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
