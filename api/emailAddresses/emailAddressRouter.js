const express = require('express');
const router = express.Router();
const EmailAddresses = require('./statusModel');
const { requireAdmin } = require('../middleware/authorization');

router.get('/', (req, res, next) => {
  EmailAddresses.findAll()
    .then((emailAddresses) => {
      res.status(200).json(emailAddresses);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  EmailAddresses.findById(id)
    .then((emailAddress) => {
      if (emailAddress) {
        res.status(200).json(emailAddress);
      } else {
        res.status(404).json({ error: `Email Address ${id} not found` });
      }
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  EmailAddresses.createEmailAddress(req.body)
    .then((newEmailAddress) => {
      res
        .status(201)
        .json({ message: 'Email Address created', status: newEmailAddress });
    })
    .catch(next);
});

router.put('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  EmailAddresses.updateEmailAddress(id, req.body)
    .then((editedEmailAddress) => {
      res.status(200).json({
        message: `EmailAddress ${id} updated`,
        status: editedEmailAddress,
      });
    })
    .catch(next);
});

router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  EmailAddresses.removeEmailAddress(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `EmailAddress ${id} has been removed` });
      } else {
        res
          .status(404)
          .json({ message: `EmailAddress ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
