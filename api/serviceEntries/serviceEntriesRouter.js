const express = require('express');
const DB = require('../utils/db-helper');
const router = express.Router();

router.get('/', (req, res) => {
  DB.findAll('service_entries')
    .then((entries) => {
      res.status(200).json(entries);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  DB.findById('service_entries', id)
    .then((entry) => {
      if (entry) {
        res.status(200).json(entry);
      } else {
        res.status(404).json({ error: `Entry ${id} not found` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  DB.create('service_entries', req.body)
    .then((newEntry) => {
      res.status(201).json(newEntry);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put('/:id', (req, res) => {
  DB.update('service_entries', req.params.id, req.body)
    .then((editedEntry) => {
      res.status(200).json(editedEntry);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  DB.remove('service_entries', id)
    .then(() => {
      res.status(200).json({ message: `Entry ${id} has been removed` });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
