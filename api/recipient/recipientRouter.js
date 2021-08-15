const express = require('express');
const DB = require('../utils/db-helper');
const Recipients = require('./recipientModel');
const router = express.Router();
const {
  requireAdmin,
  requireProgramManager,
} = require('../middleware/authorization');

// GET - View all recipients
// All users can view all recipients
router.get('/', (req, res, next) => {
  Recipients.findAll()
    .then((recipients) => {
      res.status(200).json(recipients);
    })
    .catch(next);
});

router.get('/veterans', (req, res, next) => {
  Recipients.findAll({ 'r.recipient_veteran_status': true })
    .then(recipients => {
      res.status(200).json(recipients);
    })
    .catch(next);
});

// GET - View recipient by ID
// All users can view recipients by ID
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  Recipients.findById(id)
    .then((recipient) => {
      if (recipient) {
        res.status(200).json(recipient);
      } else {
        res.status(404).json({ error: `Recipient ${id} not found` });
      }
    })
    .catch(next);
});


router.post('/findRecipient', (req, res, next) => {
  const { firstName, middleName, lastName } = req.body;
  Recipients.findAll({
    'r.recipient_first_name': firstName,
    'r.recipient_middle_name': middleName,
    'r.recipient_last_name': lastName
  })
    .then((recipients) => {
      if (recipients) {
        res.status(200).json(recipients);
      } else {
        res.status(404).json({ error: `Recipient not found` });
      }
    })
    .catch(next);
});

// POST - Create new recipient
// All users can add a new recipient
router.post('/', (req, res, next) => {
  Recipients.create('recipients', req.body)
    .then((newRecipient) => {
      res.status(201).json({ message: 'Recipient created', newRecipient });
    })
    .catch(next);
});

// PUT - Update recipient by ID
// Only Admin and Program Managers can update recipient by ID
router.put('/:id', requireAdmin, requireProgramManager, (req, res, next) => {
  DB.update('recipients', req.params.id, req.body)
    .then((editedRecipient) => {
      res.status(200).json({
        message: `Recipient ${req.params.id} updated`,
        editedRecipient,
      });
    })
    .catch(next);
});

// DELETE - Remove recipient by ID
// Only Admin can remove recipient by ID
router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;

  Recipients.deleteRecipient(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Recipient ${id} has been removed` });
      } else {
        res.status(404).json({ message: `Recipient ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
