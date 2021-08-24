const express = require('express');
const router = express.Router();
const Races = require('./RacesModel');
const { requireAdmin } = require('../middleware/authorization');

router.get('/', (req, res, next) => {
  Races.findAll()
    .then((races) => {
      res.status(200).json(races);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Races.findById(id)
    .then((race) => {
      if (race) {
        res.status(200).json(race);
      } else {
        res.status(404).json({ error: `Race ${id} not found` });
      }
    })
    .catch(next);
});

router.post('/', requireAdmin, (req, res, next) => {
  Races.createRace(req.body)
    .then((newRace) => {
      res.status(201).json({ message: 'Race created', status: newRace });
    })
    .catch(next);
});

router.put('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  Races.updateRace(id, req.body)
    .then((editedRace) => {
      res.status(200).json({
        message: `Race ${id} updated`,
        status: editedRace,
      });
    })
    .catch(next);
});

router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  Races.removeRace(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Race ${id} has been removed` });
      } else {
        res.status(404).json({ message: `Race ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
