const express = require('express');
// eslint-disable-next-line
const DB = require('../utils/db-helper');
const router = express.Router();
// Need to make middleware for recipients

// eslint-disable-next-line
router.get('/', (req, res) => {
  DB.findAll('recipients')
    .then((recipients) => {
      res.status(200).json(recipients);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// eslint-disable-next-line
router.get('/:id', (req, res) => {

});

router.post('/', (req, res) => {
  DB.create('recipients', req.body)
    .then((newRecipient) => {
      res.status(201).json({ message: 'Recipient created', newRecipient });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put('/:id', (req, res) => {
  DB.update('recipients', req.params.id, req.body)
    .then((editedRecipient) => {
      res.status(200).json({
        message: `Recipient ${req.params.id} updated`,
        editedRecipient,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// eslint-disable-next-line
router.delete('/:id', (req, res) => {

});

// eslint-disable-next-line
module.exports = router;