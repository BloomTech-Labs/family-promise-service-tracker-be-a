const express = require('express');
const router = express.Router();
const ServiceUnits = require('./serviceUnitModel');
const { requireAdmin } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *   ServiceUnits:
 *    type: object
 *    properties:
 *     service_unit_id:
 *      type: integer
 *     service_unit_name:
 *      type: string
 *     service_unit_description:
 *      type: text
 *    required:
 *    - service_unit_id
 *    - service_unit_name
 *
 * /api/serviceUnits:
 *  get:
 *    summary: Returns all service units
 *    security:
 *      - okta: []
 *    tags:
 *      - service unit
 *    responses:
 *      200:
 *        description: Array of all service units
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  ServiceUnits.findAll()
    .then((serviceUnits) => {
      res.status(200).json(serviceUnits);
    })
    .catch(next);
});

/**
 * @swagger
 *  components:
 *  parameters:
 *    service_units_id:
 *      name: service_units_id
 *      in: path
 *      description: primary key for service units table
 *      required: true
 *      schema:
 *        type: integer
 * /api/serviceUnits/{service_units_id}:
 *  get:
 *    summary: Returns a service unit using service_units_id
 *    security:
 *      - okta: []
 *    tags:
 *      - service unit
 *    parameters:
 *      - $ref: '#/components/parameters/service_units_id'
 *    responses:
 *      200:
 *        description: A valid service type in our system
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  ServiceUnits.findById(id)
    .then((serviceUnit) => {
      if (serviceUnit) {
        res.status(200).json(serviceUnit);
      } else {
        res.status(404).json({ error: `Service Unit ${id} not found` });
      }
    })
    .catch(next);
});

/**
 * @swagger
 * /api/serviceUnits:
 *  post:
 *    summary: Add a service unit
 *    security:
 *      - okta: []
 *    tags:
 *      - service unit
 *    requestBody:
 *      description: service unit object to to be added
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          example:
 *            service_unit_name: ''
 *            service_unit_description: ''
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: A newly created service unit in the system.
 */
router.post('/', requireAdmin, (req, res, next) => {
  ServiceUnits.createServiceUnit(req.body)
    .then((newServiceUnit) => {
      res
        .status(201)
        .json({ message: 'ServiceUnit created', status: newServiceUnit });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/serviceUnits/{service_unit_id}:
 *  put:
 *    summary: Update a service unit
 *    security:
 *      - okta: []
 *    tags:
 *      - service unit
 *    parameters:
 *      - $ref: '#/components/parameters/service_unit_id'
 *    requestBody:
 *      description: Service unit object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            service_unit_id: ''
 *            service_unit_name: ''
 *            service_unit_description: ''
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The newly updated service unit object
 */
router.put('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  ServiceUnits.updateServiceUnit(id, req.body)
    .then((editedServiceUnit) => {
      res.status(200).json({
        message: `Service Unit ${id} updated`,
        status: editedServiceUnit,
      });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/serviceUnits/{service_unit_id}:
 *  delete:
 *   summary: Delete a service unit from our system
 *   security:
 *    - okta: []
 *   tags:
 *    - service unit
 *   parameters:
 *    - $ref: '#/components/parameters/service_unit_id'
 *   responses:
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    200:
 *     description: The deleted service unit object
 */
router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  ServiceUnits.removeServiceUnit(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `Service Unit ${id} has been removed` });
      } else {
        res
          .status(404)
          .json({ message: `Service Unit ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
