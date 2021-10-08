const express = require('express');
const Metric = require('./metricsModel');
const DS = require('../dsService/dsModel');
const router = express.Router();

router.get('/total', (req, res, next) => {
  DS.getTotal()
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch(next);
});

router.get('/families', (req, res, next) => {
  DS.getFamilies()
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch(next);
});

router.get('/children', (req, res, next) => {
  DS.getChildren()
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch(next);
});

router.get('/recipientscount', (req, res, next) => {
  Metric.findAllUniqueRecipients()
    .then((recipients) => {
      res.status(200).json(recipients);
    })
    .catch(next);
});

router.get('/servicescount', (req, res, next) => {
  Metric.findAllUniqueServices()
    .then((services) => {
      res.status(200).json(services);
    })
    .catch(next);
});

router.get('/recipientsweek', (req, res, next) => {
  Metric.newRecipientsLastWeek()
    .then((new_recipients) => {
      res.status(200).json(new_recipients);
    })
    .catch(next);
});

router.get('/servicesweek', (req, res, next) => {
  Metric.newServicesLastWeek()
    .then((new_service_entries) => {
      res.status(200).json(new_service_entries);
    })
    .catch(next);
});

module.exports = router;
