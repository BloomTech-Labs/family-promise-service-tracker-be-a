const express = require('express');
const DB = require('../utils/db-helper');
const router = express.Router();
const Households = require('./householdModel');
const { requireAdmin } = require('../middleware/authorization');

// GET - View all households
router.get('/', (req, res) => {
  DB.findAll('households')
    .then((households) => {
      res.status(200).json(households);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// GET - View household by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  DB.findById('households', id)
    .then((household) => {
      if (household) {
        res.status(200).json(household);
      } else {
        res.status(404).json({ error: `Household ${id} not found` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// POST - Create new household
router.post('/', (req, res) => {
  Households.create('households', req.body)
    .then((response) => {
      return Households.findById(response[0].household_id);
    })
    .then((newHousehold) => {
      res.status(201).json({ message: 'Household created', newHousehold });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// PUT - Update household by ID
router.put('/:id', (req, res) => {
  DB.update('households', req.params.id, req.body)
    .then((editedHousehold) => {
      res.status(200).json({
        message: `Household ${req.params.id} updated`,
        editedHousehold,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// DELETE - Remove household by ID
router.delete('/:id', requireAdmin, (req, res) => {
  const { id } = req.params;

  DB.remove('households', id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Household ${id} has been removed` });
      } else {
        res.status(404).json({ message: `Household ${id} could not be found` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
