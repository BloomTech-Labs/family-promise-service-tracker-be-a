const express = require('express');
const ServiceTypePrograms = require('./serviceTypeProgramsModel');
const router = express.Router();

router.get('/', (req, res, next) => {
  ServiceTypePrograms.findAll()
    .then((entries) => {
      res.status(200).json(entries);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  ServiceTypePrograms.findById(id)
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
  ServiceTypePrograms.createServiceTypeProgram(req.body)
    .then((newServiceEntry) => {
      res
        .status(201)
        .json({ message: 'Service Type Program created', newServiceEntry });
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  ServiceTypePrograms.updateServiceTypeProgram(id, req.body)
    .then((response) => {
      return ServiceTypePrograms.findById(response[0].service_entry_id);
    })
    .then((editedEntry) => {
      res.status(200).json({
        message: `Service Type Program ${id} updated`,
        editedEntry,
      });
    })
    .catch(next);
});

// Deletes should be used with hesitation
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  ServiceTypePrograms.removeServiceTypeProgram(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `Service Type Program ${id} has been removed` });
      } else {
        res
          .status(404)
          .json({ message: `Service Type Program ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
