const express = require('express');
const Metric = require('./metricsModel');
const DS = require('../dsService/dsModel');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Metrics:
 *      type:number
 *
 * /api/metrics/total:
 *  get:
 *    summary: Returns the total number of recipients served
 *    security:
 *      - okta: []
 *    tags:
 *      - metrics
 *    responses:
 *      200:
 *        description: Total number of recipients served
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/total', (req, res, next) => {
  DS.getTotal()
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch(next);
});

/**
 * @swagger
 * components:
 *  schemas:
 *    Metrics:
 *      type:number
 *
 * /api/metrics/families:
 *  get:
 *    summary: Returns the total number of families served
 *    security:
 *      - okta: []
 *    tags:
 *      - metrics
 *    responses:
 *      200:
 *        description: Total number of families served
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/families', (req, res, next) => {
  DS.getFamilies()
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch(next);
});

/**
 * @swagger
 * components:
 *  schemas:
 *    Metrics:
 *      type:number
 *
 * /api/metrics/children:
 *  get:
 *    summary: Returns the total number of recipients who are under 18 served
 *    security:
 *      - okta: []
 *    tags:
 *      - metrics
 *    responses:
 *      200:
 *        description: Total number of recipients under 18, not inclusive, served
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/children', (req, res, next) => {
  DS.getChildren()
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch(next);
});

/**
 * @swagger
 * components:
 *  schemas:
 *    Metrics:
 *      type:object
 *
 * /api/metrics/genders:
 *  get:
 *    summary: Returns the count of each gender served
 *    security:
 *      - okta: []
 *    tags:
 *      - metrics
 *    responses:
 *      200:
 *        description: Returns the count of each gender served as an array of objects
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/genders', (req, res, next) => {
  DS.getGender()
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch(next);
});

/**
 * @swagger
 * components:
 *  schemas:
 *    Metrics:
 *      type:object
 *
 * /api/metrics/races:
 *  get:
 *    summary: Returns the count of each race served
 *    security:
 *      - okta: []
 *    tags:
 *      - metrics
 *    responses:
 *      200:
 *        description: Returns the count of each race served as an array of objects
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/races', (req, res, next) => {
  DS.getRace()
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch(next);
});

/**
 * @swagger
 * components:
 *  schemas:
 *    Metrics:
 *      type:object
 *
 * /api/metrics/ethnicities:
 *  get:
 *    summary: Returns the count of each ethnicity served
 *    security:
 *      - okta: []
 *    tags:
 *      - metrics
 *    responses:
 *      200:
 *        description: Returns the count of each ethnicity served as an array of objects
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/ethnicities', (req, res, next) => {
  DS.getEthnicities()
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch(next);
});

/**
 * @swagger
 * components:
 *  schemas:
 *    Metrics:
 *      type:object
 *
 * /api/metrics/programs:
 *  get:
 *    summary: Returns the count of services for each program
 *    security:
 *      - okta: []
 *    tags:
 *      - metrics
 *    responses:
 *      200:
 *        description: Returns the count of services done for each program as an array of objects
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/programs', (req, res, next) => {
  DS.getPrograms()
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch(next);
});

/**
 * @swagger
 * components:
 *  schemas:
 *    Metrics:
 *      type:object
 *
 * /api/metrics/services:
 *  get:
 *    summary: Returns the count of services provided
 *    security:
 *      - okta: []
 *    tags:
 *      - metrics
 *    responses:
 *      200:
 *        description: Returns the count of services provided as an array of objects
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/services', (req, res, next) => {
  DS.getServices()
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch(next);
});

/**
 * @swagger
 * components:
 *  schemas:
 *    Metrics:
 *      type:object
 *
 * /api/metrics/locations:
 *  get:
 *    summary: Returns the count of services at each location type
 *    security:
 *      - okta: []
 *    tags:
 *      - metrics
 *    responses:
 *      200:
 *        description: Returns the count of services at each location type as an array of objects
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/locations', (req, res, next) => {
  DS.getLocations()
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
