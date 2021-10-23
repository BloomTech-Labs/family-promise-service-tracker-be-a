const express = require('express');
const router = express.Router();
const ServiceTypes = require('./serviceTypeModel');
const { canCrudServiceType } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *   ServiceTypes:
 *    type: object
 *    properties:
 *     service_type_id:
 *      type: integer
 *     service_type_name:
 *      type: string
 *     service_type_description:
 *      type: text
 *     service_type_is_active:
 *      type: boolean
 *     service_type_entry_model:
 *      type: object
 *      description: jsonb object
 *     created_at:
 *      type: string
 *      format: date-time
 *     updated_at:
 *      type: string
 *      format: date-time
 *    required:
 *    - service_type_id
 *    - service_type_name
 *    - service_type_is_active
 *
 * /api/service_types:
 *  get:
 *    summary: Returns all service types
 *    security:
 *      - okta: []
 *    tags:
 *      - service type
 *    responses:
 *      200:
 *        description: Array of all service types
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  ServiceTypes.findAll()
    .then((statuses) => {
      res.status(200).json(statuses);
    })
    .catch(next);
});

/**
 * @swagger
 *  components:
 *  parameters:
 *    service_type_id:
 *      name: service_type_id
 *      in: path
 *      description: primary key for service types table
 *      required: true
 *      schema:
 *        type: integer
 * /api/service_types/{service_type_id}:
 *  get:
 *    summary: Returns a service type using service_type_id
 *    security:
 *      - okta: []
 *    tags:
 *      - service type
 *    parameters:
 *      - $ref: '#/components/parameters/service_type_id'
 *    responses:
 *      200:
 *        description: A valid service type in our system
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  ServiceTypes.findById(id)
    .then((service) => {
      if (service) {
        res.status(200).json(service);
      } else {
        res.status(404).json({ error: `Service Type ${id} not found` });
      }
    })
    .catch(next);
});

/**
 * @swagger
 * /api/service_types:
 *  post:
 *    summary: Add a service type
 *    security:
 *      - okta: []
 *    tags:
 *      - service type
 *    requestBody:
 *      description: service type object to to be added
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          example:
 *            service_type_name: ''
 *            service_type_description: ''
 *            service_type_is_active: ''
 *            service_type_entry_model: ''
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: A newly created service type in the system.
 */
router.post('/', canCrudServiceType, (req, res, next) => {
  ServiceTypes.createServiceType(req.body)
    .then((newServiceTypeData) => {
      res.status(201).json({
        message: 'New service type created',
        service_type: newServiceTypeData.service_type,
        service_type_programs: newServiceTypeData.service_type_programs,
      });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/service_types/{service_type_id}:
 *  put:
 *    summary: Update a service type
 *    security:
 *      - okta: []
 *    tags:
 *      - service type
 *    parameters:
 *      - $ref: '#/components/parameters/service_type_id'
 *    requestBody:
 *      description: Service type object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            service_type_id: ''
 *            service_type_name: ''
 *            service_type_description: ''
 *            service_type_is_active: ''
 *            service_type_entry_model: ''
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The newly updated service type object
 */
router.put('/:id', canCrudServiceType, (req, res, next) => {
  const { id } = req.params;
  ServiceTypes.updateServiceType(id, req.body)
    .then((editedHousehold) => {
      res.status(200).json({
        message: 'Service type updated',
        service_type: editedHousehold,
      });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/service_types/{service_type_id}:
 *  delete:
 *   summary: Delete a service type from our system
 *   security:
 *    - okta: []
 *   tags:
 *    - service type
 *   parameters:
 *    - $ref: '#/components/parameters/service_type_id'
 *   responses:
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    200:
 *     description: The deleted service type object
 */
router.delete('/:id', canCrudServiceType, (req, res, next) => {
  const { id } = req.params;
  ServiceTypes.removeServiceType(id)
    .then((result) => {
      res
        .status(200)
        .json({ message: `Service Type ${id} has been removed`, result });
    })
    .catch(next);
});

module.exports = router;
