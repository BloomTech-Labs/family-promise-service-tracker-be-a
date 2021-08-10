const express = require('express');
const DB = require('../utils/db-helper');
const ServiceEntries = require('./serviceEntriesModel');
const router = express.Router();

router.get('/', (req, res, next) => {
  ServiceEntries.findAll('service_entries')
    .then((entries) => {
      res.status(200).json(entries);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  ServiceEntries.findById(id)
    .then((entry) => {
      if (entry) {
        res.status(200).json(entry);
      } else {
        res.status(404).json({ error: `Entry ${id} not found` });
      }
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  DB.create('service_entries', req.body)
    .then((response) => {
      return ServiceEntries.findById(response[0].id);
    })
    .then((newEntry) => {
      res.status(201).json({
        message: `Service Entry created`,
        newEntry,
      });
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  DB.update('service_entries', req.params.id, req.body)
    .then((response) => {
      return ServiceEntries.findById(response[0].id);
    })
    .then((editedEntry) => {
      res.status(200).json({
        message: `Service Entry ${req.params.id} updated`,
        editedEntry,
      });
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  ServiceEntries.deleteRecord(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `Service Entry ${id} has been removed` });
      } else {
        res
          .status(404)
          .json({ message: `Service Entry ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
