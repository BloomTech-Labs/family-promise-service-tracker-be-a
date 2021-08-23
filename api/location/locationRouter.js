const express = require('express');
const Locations = require('./locationModel');
const router = express.Router();
const { requireAdmin } = require('../middleware/authorization');

// GET - View all locations
router.get('/', (req, res, next) => {
  Locations.findAll()
    .then((locations) => {
      res.status(200).json(locations);
    })
    .catch(next);
});

// GET - View Location by ID
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  Locations.findById(id)
    .then((Location) => {
      if (Location) {
        res.status(200).json(Location);
      } else {
        res.status(404).json({ error: `Location ${id} not found` });
      }
    })
    .catch(next);
});

// POST - Create new Location
router.post('/', (req, res, next) => {
  Locations.createLocation(req.body)
    .then((newLocation) => {
      res.status(201).json({ message: 'Location created', newLocation });
    })
    .catch(next);
});

// PUT - Update Location by ID
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  Locations.updateLocation(id, req.body)
    .then((editedLocation) => {
      res.status(200).json({
        message: `Location ${id} updated`,
        editedLocation,
      });
    })
    .catch(next);
});

// DELETE - Remove Location by ID - *only Admins can delete locations
router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;

  Locations.removeLocation(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Location ${id} has been removed` });
      } else {
        res.status(404).json({ message: `Location ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
