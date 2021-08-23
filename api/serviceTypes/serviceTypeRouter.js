const express = require('express');
const router = express.Router();
const ServiceTypes = require('./serviceTypeModel');
const { canCrudServiceType } = require('../middleware/authorization');

router.get('/', (req, res, next) => {
  ServiceTypes.findAll()
    .then((statuses) => {
      res.status(200).json(statuses);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  ServiceTypes.findById(id)
    .then((service) => {
      if (service) {
        res.status(200).json(service);
      } else {
        res.status(404).json({ error: `Service Type ${id} not found` });
      }
    })
    .catch(next);
});

router.post('/', canCrudServiceType, (req, res, next) => {
  ServiceTypes.createServiceType(req.body)
    .then((newServiceType) => {
      res.status(201).json({
        message: 'New service type created',
        service_type: newServiceType,
      });
    })
    .catch(next);
});

router.put('/:id', canCrudServiceType, (req, res, next) => {
  const { id } = req.params;
  ServiceTypes.updateServiceType(id, req.body)
    .then((editedHousehold) => {
      res.status(200).json({
        message: 'Service type updated',
        service_type: editedHousehold,
      });
    })
    .catch(next);
});

router.delete('/:id', canCrudServiceType, (req, res, next) => {
  const { id } = req.params;
  ServiceTypes.removeServiceType(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `Service Type ${id} has been removed` });
      } else {
        res
          .status(404)
          .json({ message: `Service Type ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
