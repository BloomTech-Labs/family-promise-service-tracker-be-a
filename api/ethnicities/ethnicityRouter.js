const express = require('express');
const Ethnicities = require('./ethnicityModel');
const router = express.Router();
const { requireAdmin } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *   Ethnicities:
 *    type: object
 *    properties:
 *     ethnicity_id:
 *      type: integer
 *     ethnicity:
 *      type: string
 *    required:
 *    - ethnicity_id
 *    - ethnicity
 *
 * /api/ethnicities:
 *  get:
 *    summary: Returns all ethicities
 *    security:
 *      - okta: []
 *    tags:
 *      - ethnicity
 *    responses:
 *      200:
 *        description: Array of all Ethnicities
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  Ethnicities.findAll()
    .then((ethnicities) => {
      res.status(200).json(ethnicities);
    })
    .catch(next);
});

/**
 * @swagger
 *  components:
 *  parameters:
 *    ethnicity_id:
 *      name: ethnicity_id
 *      in: path
 *      description: primary key for ethnicities table
 *      required: true
 *      schema:
 *        type: integer
 * /api/ethnicities/{ethnicity_id}:
 *  get:
 *    summary: Returns an ethnicity using ethnicity_id
 *    security:
 *      - okta: []
 *    tags:
 *      - ethnicity
 *    parameters:
 *      - $ref: '#/components/parameters/ethnicity_id'
 *    responses:
 *      200:
 *        description: A valid ethnicity in our system
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Ethnicities.findById(id)
    .then((ethnicity) => {
      if (ethnicity) {
        res.status(200).json(ethnicity);
      } else {
        res.status(404).json({ error: `Ethnicity ${id} not found` });
      }
    })
    .catch(next);
});

/**
 * @swagger
 * /api/ethnicities:
 *  post:
 *    summary: Add a ethnicity
 *    security:
 *      - okta: []
 *    tags:
 *      - ethnicity
 *    requestBody:
 *      description: Ethnicity object to to be added
 *      content:
 *        application/json:
 *         schema:
 *            type: string
 *            example:
 *             ethnicity: ''
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: A newly created ethnicity in the system.
 */
router.post('/', requireAdmin, (req, res, next) => {
  Ethnicities.createEthnicity(req.body)
    .then((newEthnicity) => {
      res
        .status(201)
        .json({ message: 'Ethnicity created', status: newEthnicity });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/ethnicities/{ethnicity_id}:
 *  put:
 *    summary: Update an ethnicity
 *    security:
 *      - okta: []
 *    tags:
 *      - ethnicity
 *    parameters:
 *      - $ref: '#/components/parameters/ethnicity_id'
 *    requestBody:
 *      description: Ethnicity object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Ethnicities'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The newly updated ethnicity object
 */
router.put('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  Ethnicities.updateEthnicity(id, req.body)
    .then((editedEthnicity) => {
      res.status(200).json({
        message: `Ethnicity ${id} updated`,
        status: editedEthnicity,
      });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/ethnicities/{ethnicity_id}:
 *  delete:
 *   summary: Delete an ethnicity
 *   security:
 *    - okta: []
 *   tags:
 *    - ethnicity
 *   parameters:
 *    - $ref: '#/components/parameters/ethnicity_id'
 *   responses:
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    200:
 *     description: The deleted ethnicity object
 */
router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  Ethnicities.removeEthnicity(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Ethnicity ${id} has been removed` });
      } else {
        res.status(404).json({ message: `Ethnicity ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
