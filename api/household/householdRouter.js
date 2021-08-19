const express = require('express');
const router = express.Router();
const Households = require('./householdModel');
const { requireAdmin } = require('../middleware/authorization');

// GET - View all households
router.get('/', (req, res, next) => {
  Households.findAll()
    .then((households) => {
      res.status(200).json(households);
    })
    .catch(next);
});

// GET - View household by ID
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  Households.findById()
    .then((household) => {
      if (household) {
        res.status(200).json(household);
      } else {
        res.status(404).json({ error: `Household ${id} not found` });
      }
    })
    .catch(next);
});

// POST - Create new household
router.post('/', (req, res, next) => {
  Households.create()
    .then((response) => {
      return Households.findById(response[0].household_id);
    })
    .then((newHousehold) => {
      res.status(201).json({ message: 'Household created', newHousehold });
    })
    .catch(next);
});

// PUT - Update household by ID
router.put('/:id', (req, res, next) => {
  Households.update()
    .then((editedHousehold) => {
      res.status(200).json({
        message: `Household ${req.params.id} updated`,
        editedHousehold,
      });
    })
    .catch(next);
});

// DELETE - Remove household by ID
router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;

  Households.remove()
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Household ${id} has been removed` });
      } else {
        res.status(404).json({ message: `Household ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
