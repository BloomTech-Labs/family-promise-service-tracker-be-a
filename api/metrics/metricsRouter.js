const express = require('express');
const Metric = require('./metricsModel');
const router = express.Router();

router.get('/recipientscount', (req, res) => {
  Metric.findAllUniqueRecipients()
    .then((recipients) => {
      res.status(200).json(recipients);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/servicescount', (req, res) => {
  Metric.findAllUniqueServices()
    .then((services) => {
      res.status(200).json(services);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/recipientsweek', (req, res) => {
  Metric.newRecipientsLastWeek()
    .then((new_recipients) => {
      res.status(200).json(new_recipients);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/servicesweek', (req, res) => {
  Metric.newServicesLastWeek()
    .then((new_service_entries) => {
      res.status(200).json(new_service_entries);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
