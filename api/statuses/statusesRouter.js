const express = require('express');
const DB = require('../utils/db-helper');
const router = express.Router();
const { requireAdmin } = require('../middleware/authorization');

router.get('/', (req, res) => {
  DB.findAll('statuses')
    .then((statuses) => {
      res.status(200).json(statuses);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  DB.findById('statuses', id)
    .then((status) => {
      if (status) {
        res.status(200).json(status);
      } else {
        res.status(404).json({ error: `Status ${id} not found` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', requireAdmin, (req, res) => {
  DB.create('statuses', req.body)
    .then((newStatus) => {
      res.status(201).json(newStatus);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put('/:id', requireAdmin, (req, res) => {
  DB.update('statuses', req.params.id, req.body)
    .then((editedStatus) => {
      res.status(200).json(editedStatus);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete('/:id', requireAdmin, (req, res) => {
  const { id } = req.params;

  DB.remove('statuses', id)
    .then(() => {
      res.status(200).json({ message: `Status ${id} has been removed` });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
