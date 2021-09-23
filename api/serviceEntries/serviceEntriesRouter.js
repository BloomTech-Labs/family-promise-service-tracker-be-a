const express = require('express');
const ServiceEntries = require('./serviceEntriesModel');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   ServiceEntries:
 *    type: object
 *    properties:
 *     service_entry_id:
 *      type: uuid
 *     primary_provider_id:
 *      type: string
 *      description: Foreign key from providers table
 *     primary_recipient_id:
 *      type: uuid
 *      description: Foreign key from recipients table
 *     service_type_program_id:
 *      type: integer
 *      description: Foreign key from service type programs table
 *     apply_service_to_household:
 *      type: boolean
 *     service_date:
 *      type: string
 *      format: date
 *     service_time:
 *      type: string
 *     service_duration:
 *      type: string
 *     service_value:
 *      type: number
 *      format: float
 *     service_quantity:
 *      type: integer
 *     service_entry_notes:
 *      type: text
 *     service_entry_data:
 *      type: object
 *      description: jsonb object
 *     service_unit_id:
 *      type: integer
 *      description: Foreign key from service units table
 *     status_id:
 *      type: integer
 *      description: Foreign key from status table
 *     service_rating_id:
 *      type: integer
 *      description: Foreign key from service ratings table
 *     location_id:
 *      type: uuid
 *      description: Foreign key from locations table
 *     created_at:
 *      type: string
 *      format: date-time
 *     updated_at:
 *      type: string
 *      format: date-time
 *    required:
 *    - service_entry_id
 *    - primary_provider_id
 *    - primary_recipient_id
 *    - service_type_program_id
 *    - apply_service_to_household
 *    - service_date
 *    - service_entry_data
 *    - location_id
 *
 * /api/service_entries:
 *  get:
 *    summary: Returns all service_entries
 *    security:
 *      - okta: []
 *    tags:
 *      - service entry
 *    responses:
 *      200:
 *        description: Array of all service entries in system
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  ServiceEntries.findAll()
    .then((entries) => {
      res.status(200).json(entries);
    })
    .catch(next);
});

/**
 * @swagger
 *  components:
 *  parameters:
 *    service_entry_id:
 *      name: service_entry_id
 *      in: path
 *      description: primary key for service entries table
 *      required: true
 *      schema:
 *        type: uuid
 * /api/service_entries/{service_entry_id}:
 *  get:
 *    summary: Returns a service entry using service_entry_id
 *    security:
 *      - okta: []
 *    tags:
 *      - service entry
 *    parameters:
 *      - $ref: '#/components/parameters/service_entry_id'
 *    responses:
 *      200:
 *        description: A valid service entry in our system
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  ServiceEntries.findById(id)
    .then((entry) => {
      if (entry) {
        res.status(200).json(entry);
      } else {
        res.status(404).json({ error: `Entry ${id} not found` });
      }
    })
    .catch(next);
});

/**
 * @swagger
 * /api/service_entries:
 *  post:
 *    summary: Add a service entry
 *    security:
 *      - okta: []
 *    tags:
 *      - service entry
 *    requestBody:
 *      description: Service entry object to to be added
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            primary_provider_id: ""
 *            primary_recipient_id: ""
 *            service_type_program_id: ""
 *            apply_service_to_household: ""
 *            service_date: ""
 *            service_time: ""
 *            service_duration: ""
 *            service_value: ""
 *            service_quantity: ""
 *            service_entry_notes: ""
 *            service_entry_data: ""
 *            service_unit_id: ""
 *            status_id: ""
 *            service_rating_id: ""
 *            location_id: ""
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: A newly created service entry in the system.
 */
router.post('/', (req, res, next) => {
  ServiceEntries.createServiceEntry(req.body)
    .then((newServiceEntry) => {
      res
        .status(201)
        .json({ message: 'Service Entry created', newServiceEntry });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/service_entries/{service_entry_id}:
 *  put:
 *    summary: Update a service entry
 *    security:
 *      - okta: []
 *    tags:
 *      - service entry
 *    parameters:
 *      - $ref: '#/components/parameters/service_entry_id'
 *    requestBody:
 *      description: Service entry object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            service_entry_id: ""
 *            primary_provider_id: ""
 *            primary_recipient_id: ""
 *            service_type_program_id: ""
 *            apply_service_to_household: ""
 *            service_date: ""
 *            service_time: ""
 *            service_duration: ""
 *            service_value: ""
 *            service_quantity: ""
 *            service_entry_notes: ""
 *            service_entry_data: ""
 *            service_unit_id: ""
 *            status_id: ""
 *            service_rating_id: ""
 *            location_id: ""
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The updated service entry object
 */
router.put('/:id', (req, res, next) => {
  ServiceEntries.update(req.params.id, req.body)
    .then((response) => {
      return ServiceEntries.findById(response.service_entry_id);
    })
    .then((editedEntry) => {
      res.status(200).json({
        message: `Service Entry ${req.params.id} updated`,
        editedEntry,
      });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/service_entries/{service_entry_id}:
 *  delete:
 *   summary: Delete a service entry
 *   security:
 *    - okta: []
 *   tags:
 *    - service entry
 *   parameters:
 *    - $ref: '#/components/parameters/service_entry_id'
 *   responses:
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    200:
 *     description: The deleted service entry object
 */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  ServiceEntries.deleteRecord(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `Service Entry ${id} has been removed` });
      } else {
        res
          .status(404)
          .json({ message: `Service Entry ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
