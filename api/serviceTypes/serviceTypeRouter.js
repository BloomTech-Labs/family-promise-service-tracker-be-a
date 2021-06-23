const express = require('express');
const ServiceTypes = require('./serviceTypeModel');
const DB = require('../utils/db-helper');
const router = express.Router();
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
  ServiceTypes.create(req.body)
    .then((newServiceType) => {
      res.status(201).json({
        message: 'New service type created',
        service_type: newServiceType,
      });
    })
    .catch(next);
});

router.put('/:id', canCrudServiceType, (req, res) => {
  const update = req.body;

  if (Object.keys(update).length > 0) {
    const id = req.params.id;
    DB.findById('service_types', id)
      .then(
        ServiceTypes.update(id, update)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'Service type updated', service_type: updated });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update service type '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find service type '${id}'`,
          error: err.message,
        });
      });
  } else {
    res.status(400).json({ message: 'Update request not valid' });
  }
});

router.delete('/:id', canCrudServiceType, (req, res, next) => {
  const { id } = req.params;

  DB.remove('service_types', id)
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
