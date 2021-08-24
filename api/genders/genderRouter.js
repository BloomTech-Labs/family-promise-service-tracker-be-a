const express = require('express');
const Genders = require('./genderModel');
const router = express.Router();
const { requireAdmin } = require('../middleware/authorization');

router.get('/', (req, res, next) => {
  Genders.findAll()
    .then((genders) => {
      res.status(200).json(genders);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Genders.findById(id)
    .then((gender) => {
      if (gender) {
        res.status(200).json(gender);
      } else {
        res.status(404).json({ error: `Gender ${id} not found` });
      }
    })
    .catch(next);
});

router.post('/', requireAdmin, (req, res, next) => {
  Genders.createGender(req.body)
    .then((newGender) => {
      res.status(201).json({ message: 'Gender created', status: newGender });
    })
    .catch(next);
});

router.put('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  Genders.updateGender(id, req.body)
    .then((editedGender) => {
      res.status(200).json({
        message: `Gender ${id} updated`,
        status: editedGender,
      });
    })
    .catch(next);
});

router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  Genders.removeGender(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Gender ${id} has been removed` });
      } else {
        res.status(404).json({ message: `Gender ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
