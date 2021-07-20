const express = require('express');
const DB = require('../utils/db-helper');
const Programs = require('./programModel');
const router = express.Router();
const { canCrudServiceType } = require('../middleware/authorization');

router.get('/', (req, res, next) => {
  Programs.findAll()
    .then((programs) => {
      res.status(200).json(programs);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  Programs.findById(id)
    .then((program) => {
      if (program) {
        res.status(200).json(program);
      } else {
        res.status(404).json({ error: `Program ${id} not found` });
      }
    })
    .catch(next);
});

router.post('/name', (req, res, next) => {
  const { name } = req.body;

  Programs.findBy({ name: name })
    .then((program) => {
      res.status(200).json(program);
    })
    .catch(next);
});

router.post('/type', (req, res, next) => {
  const { type } = req.body;

  Programs.findBy({ type: type })
    .then((program) => {
      res.status(200).json(program);
    })
    .catch(next);
});

router.post('/', canCrudServiceType, (req, res, next) => {
  DB.create('programs', req.body)
    .then((newProgram) => {
      res.status(201).json(newProgram);
    })
    .catch(next);
});

router.put('/:id', canCrudServiceType, (req, res, next) => {
  DB.update('programs', req.params.id, req.body)
    .then((editedProgram) => {
      res.status(200).json(editedProgram);
    })
    .catch(next);
});

router.delete('/:id', canCrudServiceType, (req, res, next) => {
  const { id } = req.params;

  DB.removeProgram('programs', id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Program ${id} has been removed` });
      } else {
        res.status(404).json({ message: `Program ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
