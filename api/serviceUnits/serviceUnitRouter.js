const express = require('express');
const router = express.Router();
const ServiceUnits = require('./serviceUnitModel');
const { requireAdmin } = require('../middleware/authorization');

router.get('/', (req, res, next) => {
  ServiceUnits.findAll()
    .then((serviceUnits) => {
      res.status(200).json(serviceUnits);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  ServiceUnits.findById(id)
    .then((serviceUnit) => {
      if (serviceUnit) {
        res.status(200).json(serviceUnit);
      } else {
        res.status(404).json({ error: `Service Unit ${id} not found` });
      }
    })
    .catch(next);
});

router.post('/', requireAdmin, (req, res, next) => {
  ServiceUnits.createServiceUnit(req.body)
    .then((newServiceUnit) => {
      res
        .status(201)
        .json({ message: 'ServiceUnit created', status: newServiceUnit });
    })
    .catch(next);
});

router.put('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  ServiceUnits.updateServiceUnit(id, req.body)
    .then((editedServiceUnit) => {
      res.status(200).json({
        message: `Service Unit ${id} updated`,
        status: editedServiceUnit,
      });
    })
    .catch(next);
});

router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  ServiceUnits.removeServiceUnit(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `Service Unit ${id} has been removed` });
      } else {
        res
          .status(404)
          .json({ message: `Service Unit ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
