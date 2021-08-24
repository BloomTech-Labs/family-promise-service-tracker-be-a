const express = require('express');
const Recipients = require('./recipientModel');
const router = express.Router();
const {
  requireAdmin,
  requireProgramManager,
} = require('../middleware/authorization');

// GET - View all recipients
router.get('/', (req, res, next) => {
  Recipients.findAll()
    .then((recipients) => {
      res.status(200).json(recipients);
    })
    .catch(next);
});

// GET - View recipient by ID
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

router.get('/veterans', (req, res, next) => {
  Recipients.findAll({ 'r.recipient_veteran_status': true })
    .then((recipients) => {
      res.status(200).json(recipients);
    })
    .catch(next);
});

router.get('/findRecipient', (req, res, next) => {
  const { firstName, middleName, lastName } = req.body;
  Recipients.findAll({
    'r.recipient_first_name': firstName,
    'r.recipient_middle_name': middleName,
    'r.recipient_last_name': lastName,
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
router.post('/', (req, res, next) => {
  Recipients.createRecipient(req.body)
    .then((newRecipient) => {
      res.status(201).json({ message: 'Recipient created', newRecipient });
    })
    .catch(next);
});

// PUT - Update recipient by ID
// Only Admin and Program Managers should be able to update recipient by ID
router.put('/:id', requireAdmin, requireProgramManager, (req, res, next) => {
  const { id } = req.params;
  Recipients.updateRecipient(id, req.body)
    .then((editedRecipient) => {
      res.status(200).json({
        message: `Recipient ${id} updated`,
        editedRecipient,
      });
    })
    .catch(next);
});

// DELETE - Remove recipient by ID
// Only Admin should be able to remove recipient by ID
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
