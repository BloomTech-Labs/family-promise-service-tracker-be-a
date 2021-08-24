const express = require('express');
const router = express.Router();
const PhoneNumbers = require('./phoneNumberModel');
const { requireAdmin } = require('../middleware/authorization');

router.get('/', (req, res, next) => {
  PhoneNumbers.findAll()
    .then((phoneNumbers) => {
      res.status(200).json(phoneNumbers);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  PhoneNumbers.findById(id)
    .then((phoneNumber) => {
      if (phoneNumber) {
        res.status(200).json(phoneNumber);
      } else {
        res.status(404).json({ error: `PhoneNumber ${id} not found` });
      }
    })
    .catch(next);
});

router.post('/', requireAdmin, (req, res, next) => {
  PhoneNumbers.createPhoneNumber(req.body)
    .then((newPhoneNumber) => {
      res
        .status(201)
        .json({ message: 'PhoneNumber created', status: newPhoneNumber });
    })
    .catch(next);
});

router.put('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  PhoneNumbers.updatePhoneNumber(id, req.body)
    .then((editedPhoneNumber) => {
      res.status(200).json({
        message: `PhoneNumber ${id} updated`,
        status: editedPhoneNumber,
      });
    })
    .catch(next);
});

router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  PhoneNumbers.removePhoneNumber(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `PhoneNumber ${id} has been removed` });
      } else {
        res
          .status(404)
          .json({ message: `PhoneNumber ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
