const express = require('express');
const router = express.Router();
const ServiceRatings = require('./statusModel');
const { requireAdmin } = require('../middleware/authorization');

router.get('/', (req, res, next) => {
  ServiceRatings.findAll()
    .then((serviceRatings) => {
      res.status(200).json(serviceRatings);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  ServiceRatings.findById(id)
    .then((status) => {
      if (status) {
        res.status(200).json(status);
      } else {
        res.status(404).json({ error: `Service Rating ${id} not found` });
      }
    })
    .catch(next);
});

router.post('/', requireAdmin, (req, res, next) => {
  ServiceRatings.createServiceRating(req.body)
    .then((newServiceRating) => {
      res.status(201).json({
        message: 'Service Rating created',
        status: newServiceRating,
      });
    })
    .catch(next);
});

router.put('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  ServiceRatings.updatesServiceRating(id, req.body)
    .then((editedServiceRating) => {
      res.status(200).json({
        message: `Service Rating ${id} updated`,
        status: editedServiceRating,
      });
    })
    .catch(next);
});

router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  ServiceRatings.removeServiceRating(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `Service Rating ${id} has been removed` });
      } else {
        res
          .status(404)
          .json({ message: `Service Rating ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
