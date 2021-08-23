const express = require('express');
const ServiceEntries = require('./serviceEntriesModel');
const router = express.Router();

router.get('/', (req, res, next) => {
  ServiceEntries.findAll()
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
  ServiceEntries.createServiceEntry(req.body)
    .then((newServiceEntry) => {
      res
        .status(201)
        .json({ message: 'Service Entry created', newServiceEntry });
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  ServiceEntries.update(req.params.id, req.body)
    .then((response) => {
      return ServiceEntries.findById(response.service_entry_id);
    })
    .then((editedEntry) => {
      res.status(200).json({
        message: `Service Entry ${req.params.id} updated`,
        editedEntry,
      });
    })
    .catch(next);
});

// delete will not be used much, changed to an active/inactive status
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
