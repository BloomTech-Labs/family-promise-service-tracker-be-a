const express = require('express');
const DB = require('../utils/db-helper');
const router = express.Router();
const { requireAdmin } = require('../middleware/authorization');

router.get('/', (req, res, next) => {
  DB.findAll('statuses')
    .then((statuses) => {
      res.status(200).json(statuses);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  DB.findById('statuses', id)
    .then((status) => {
      if (status) {
        res.status(200).json(status);
      } else {
        res.status(404).json({ error: `Status ${id} not found` });
      }
    })
    .catch(next);
});

router.post('/', requireAdmin, (req, res, next) => {
  DB.create('statuses', req.body)
    .then((newStatus) => {
      res.status(201).json({ message: 'Status created', status: newStatus });
    })
    .catch(next);
});

router.put('/:id', requireAdmin, (req, res, next) => {
  DB.update('statuses', req.params.id, req.body)
    .then((editedStatus) => {
      res.status(200).json({
        message: `Status ${req.params.id} updated`,
        status: editedStatus[0],
      });
    })
    .catch(next);
});

router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;

  DB.remove('statuses', id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Status ${id} has been removed` });
      } else {
        res.status(404).json({ message: `Status ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
