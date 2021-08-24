const express = require('express');
const Ethnicities = require('./ethnicityModel');
const router = express.Router();
const { requireAdmin } = require('../middleware/authorization');

router.get('/', (req, res, next) => {
  Ethnicities.findAll()
    .then((ethnicities) => {
      res.status(200).json(ethnicities);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Ethnicities.findById(id)
    .then((ethnicity) => {
      if (ethnicity) {
        res.status(200).json(ethnicity);
      } else {
        res.status(404).json({ error: `Ethnicity ${id} not found` });
      }
    })
    .catch(next);
});

router.post('/', requireAdmin, (req, res, next) => {
  Ethnicities.createEthnicity(req.body)
    .then((newEthnicity) => {
      res
        .status(201)
        .json({ message: 'Ethnicity created', status: newEthnicity });
    })
    .catch(next);
});

router.put('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  Ethnicities.updateEthnicity(id, req.body)
    .then((editedEthnicity) => {
      res.status(200).json({
        message: `Ethnicity ${id} updated`,
        status: editedEthnicity,
      });
    })
    .catch(next);
});

router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  Ethnicities.removeEthnicity(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Ethnicity ${id} has been removed` });
      } else {
        res.status(404).json({ message: `Ethnicity ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
