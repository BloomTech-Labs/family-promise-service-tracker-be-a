const express = require('express');
const router = express.Router();
const ProviderRoles = require('./statusModel');
const { requireAdmin } = require('../middleware/authorization');

router.get('/', (req, res, next) => {
  ProviderRoles.findAll()
    .then((providerRoles) => {
      res.status(200).json(providerRoles);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  ProviderRoles.findById(id)
    .then((providerRole) => {
      if (providerRole) {
        res.status(200).json(providerRole);
      } else {
        res.status(404).json({ error: `Provider Role ${id} not found` });
      }
    })
    .catch(next);
});

router.post('/', requireAdmin, (req, res, next) => {
  ProviderRoles.createProviderRole(req.body)
    .then((newProviderRole) => {
      res
        .status(201)
        .json({ message: 'Provider Role created', status: newProviderRole });
    })
    .catch(next);
});

router.put('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  ProviderRoles.updateProviderRole(id, req.body)
    .then((editedProviderRole) => {
      res.status(200).json({
        message: `ProviderRole ${id} updated`,
        status: editedProviderRole,
      });
    })
    .catch(next);
});

router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  ProviderRoles.removeProviderRole(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `Provider Role ${id} has been removed` });
      } else {
        res
          .status(404)
          .json({ message: `Provider Role ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
