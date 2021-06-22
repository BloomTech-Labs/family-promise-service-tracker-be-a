const express = require('express');
const DB = require('../utils/db-helper');
const router = express.Router();
const { requireAdmin } = require('../middleware/authorization');

// GET - View all locations
router.get('/', (req, res) => {
  DB.findAll('locations')
    .then((locations) => {
      res.status(200).json(locations);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// GET - View Location by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  DB.findById('locations', id)
    .then((Location) => {
      if (Location) {
        res.status(200).json(Location);
      } else {
        res.status(404).json({ error: `Location ${id} not found` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// POST - Create new Location
router.post('/', (req, res) => {
  DB.create('locations', req.body)
    .then((newLocation) => {
      res.status(201).json({ message: 'Location created', newLocation });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// PUT - Update Location by ID
router.put('/:id', (req, res) => {
  DB.update('locations', req.params.id, req.body)
    .then((editedLocation) => {
      res.status(200).json({
        message: `Location ${req.params.id} updated`,
        editedLocation,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// DELETE - Remove Location by ID - *only Admins can delete locations
router.delete('/:id', requireAdmin, (req, res) => {
  const { id } = req.params;

  DB.remove('locations', id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Location ${id} has been removed` });
      } else {
        res.status(404).json({ message: `Location ${id} could not be found` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
