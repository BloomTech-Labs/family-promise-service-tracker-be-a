const express = require('express');
const Statuses = require('./statusModel');
const router = express.Router();
const { requireAdmin } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *   Statuses:
 *    type: object
 *    properties:
 *     status_id:
 *      type: integer
 *     status:
 *      type: string
 *    required:
 *    - status_id
 *    - status
 *
 * /api/statuses:
 *  get:
 *    summary: Returns all statuses
 *    security:
 *      - okta: []
 *    tags:
 *      - status
 *    responses:
 *      200:
 *        description: Array of all status
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  Statuses.findAll()
    .then((statuses) => {
      res.status(200).json(statuses);
    })
    .catch(next);
});

/**
 * @swagger
 *  components:
 *  parameters:
 *    status_id:
 *      name: status_id
 *      in: path
 *      description: primary key for status table
 *      required: true
 *      schema:
 *        type: integer
 * /api/statuses/{status_id}:
 *  get:
 *    summary: Returns a status using status_id
 *    security:
 *      - okta: []
 *    tags:
 *      - status
 *    parameters:
 *      - $ref: '#/components/parameters/status_id'
 *    responses:
 *      200:
 *        description: A valid status in our system
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Statuses.findById(id)
    .then((status) => {
      if (status) {
        res.status(200).json(status);
      } else {
        res.status(404).json({ error: `Status ${id} not found` });
      }
    })
    .catch(next);
});

/**
 * @swagger
 * /api/statuses:
 *  post:
 *    summary: Add a status
 *    security:
 *      - okta: []
 *    tags:
 *      - status
 *    requestBody:
 *      description: Status object to to be added
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          example:
 *            status: ''
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: A newly created status in the system.
 */
router.post('/', requireAdmin, (req, res, next) => {
  Statuses.createStatus(req.body)
    .then((newStatus) => {
      res.status(201).json({ message: 'Status created', status: newStatus });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/statuses/{status_id}:
 *  put:
 *    summary: Update a status
 *    security:
 *      - okta: []
 *    tags:
 *      - status
 *    parameters:
 *      - $ref: '#/components/parameters/status_id'
 *    requestBody:
 *      description: Status object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            status_id: ''
 *            status: ''
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The newly updated status object
 */
router.put('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  Statuses.updateStatus(id, req.body)
    .then((editedStatus) => {
      res.status(200).json({
        message: `Status ${id} updated`,
        status: editedStatus,
      });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/statuses/{status_id}:
 *  delete:
 *   summary: Delete a status from our system
 *   security:
 *    - okta: []
 *   tags:
 *    - status
 *   parameters:
 *    - $ref: '#/components/parameters/status_id'
 *   responses:
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    200:
 *     description: The deleted status object
 */
router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  Statuses.removeStatus(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Status ${id} has been removed` });
      } else {
        res.status(404).json({ message: `Status ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
