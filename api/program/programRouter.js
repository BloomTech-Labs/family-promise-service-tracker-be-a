const express = require('express');
const DB = require('../utils/db-helper');
const Programs = require('./programModel');
const router = express.Router();
const { canCrudServiceType } = require('../middleware/authorization');

router.get('/', (req, res) => {
  Programs.findAll()
    .then((programs) => {
      res.status(200).json(programs);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Programs.findById(id)
    .then((program) => {
      if (program) {
        res.status(200).json(program);
      } else {
        res.status(404).json({ error: `Program ${id} not found` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/name', (req, res) => {
  const { name } = req.body;

  Programs.findBy({ name: name })
    .then((program) => {
      res.status(200).json(program);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/type', (req, res) => {
  const { type } = req.body;

  Programs.findBy({ type: type })
    .then((program) => {
      res.status(200).json(program);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', canCrudServiceType, (req, res) => {
  DB.create('programs', req.body)
    .then((newProgram) => {
      res.status(201).json(newProgram);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put('/:id', canCrudServiceType, (req, res) => {
  DB.update('programs', req.params.id, req.body)
    .then((editedProgram) => {
      res.status(200).json(editedProgram);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete('/:id', canCrudServiceType, (req, res) => {
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
