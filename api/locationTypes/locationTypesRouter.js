const express = require('express');
const LocationTypes = require('./locationTypesModel');
const router = express.Router();

router.get('/', (req, res, next) => {
  LocationTypes.findAll()
    .then((locationTypes) => {
      res.status(200).json(locationTypes);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  LocationTypes.findById(id)
    .then((locationType) => {
      if (locationType) {
        res.status(200).json(locationType);
      } else {
        res.status(404).json({ error: `LocationType ${id} not found` });
      }
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  LocationTypes.createLocationType(req.body)
    .then((newLocationType) => {
      res
        .status(201)
        .json({ message: 'Location Type created', newLocationType });
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  LocationTypes.updateLocationType(id, req.body)
    .then((response) => {
      return LocationTypes.findById(response[0].location_type_id);
    })
    .then((editedLocationType) => {
      res.status(200).json({
        message: `Location Type ${id} updated`,
        editedLocationType,
      });
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  LocationTypes.removeLocationType(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `Location Type ${id} has been removed` });
      } else {
        res
          .status(404)
          .json({ message: `Location Type ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
