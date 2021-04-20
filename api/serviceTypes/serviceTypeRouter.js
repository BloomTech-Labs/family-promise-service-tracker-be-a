const express = require('express');
const ServiceTypes = require('./serviceTypeModel');
const router = express.Router();

router.get('/', (req, res) => {
  ServiceTypes.findAll()
    .then((statuses) => {
      res.status(200).json(statuses);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  ServiceTypes.findById(id)
    .then((service) => {
      if (service) {
        res.status(200).json(service);
      } else {
        res.status(404).json({ error: `Service Type ${id} not found` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  ServiceTypes.create(req.body)
    .then((newServiceType) => {
      res.status(201).json(newServiceType);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
