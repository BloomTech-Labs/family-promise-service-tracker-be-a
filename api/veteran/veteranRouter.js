const Veteran = require('./veteranModel');
const router = require('express').Router();

// need to implement error handling middleware
// router.get('/', (req, res, next) => {
router.get('/', (req, res) => {
  Veteran.getAll()
    .then(veterans => {
      res.status(200).json(veterans)
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
