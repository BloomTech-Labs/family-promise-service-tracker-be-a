const express = require('express');
const router = express.Router();
const ServiceRatings = require('./serviceRatingModel');
const { requireAdmin } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *   ServiceRatings:
 *    type: object
 *    properties:
 *     service_rating_id:
 *      type: integer
 *     service_rating:
 *      type: integer
 *     service_rating_description:
 *      type: text
 *    required:
 *    - service_rating_id
 *    - service_rating
 *
 * /api/serviceRatings:
 *  get:
 *    summary: Returns all service ratings
 *    security:
 *      - okta: []
 *    tags:
 *      - service rating
 *    responses:
 *      200:
 *        description: Array of all service ratings
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  ServiceRatings.findAll()
    .then((serviceRatings) => {
      res.status(200).json(serviceRatings);
    })
    .catch(next);
});

/**
 * @swagger
 *  components:
 *  parameters:
 *    service_rating_id:
 *      name: service_rating_id
 *      in: path
 *      description: primary key for service rating table
 *      required: true
 *      schema:
 *        type: integer
 * /api/serviceRatings/{service_rating_id}:
 *  get:
 *    summary: Returns a service rating using service_rating_id
 *    security:
 *      - okta: []
 *    tags:
 *      - service rating
 *    parameters:
 *      - $ref: '#/components/parameters/service_rating_id'
 *    responses:
 *      200:
 *        description: A valid service rating in our system
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  ServiceRatings.findById(id)
    .then((status) => {
      if (status) {
        res.status(200).json(status);
      } else {
        res.status(404).json({ error: `Service Rating ${id} not found` });
      }
    })
    .catch(next);
});

/**
 * @swagger
 * /api/serviceRatings:
 *  post:
 *    summary: Add a service rating
 *    security:
 *      - okta: []
 *    tags:
 *      - service rating
 *    requestBody:
 *      description: service rating object to to be added
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          example:
 *            service_rating: ''
 *            service_rating_description: ''
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: A newly created service rating in the system.
 */
router.post('/', requireAdmin, (req, res, next) => {
  ServiceRatings.createServiceRating(req.body)
    .then((newServiceRating) => {
      res.status(201).json({
        message: 'Service Rating created',
        status: newServiceRating,
      });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/serviceRatings/{service_rating_id}:
 *  put:
 *    summary: Update a service rating
 *    security:
 *      - okta: []
 *    tags:
 *      - service rating
 *    parameters:
 *      - $ref: '#/components/parameters/race_id'
 *    requestBody:
 *      description: Service rating object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            service_rating_id: ''
 *            service_rating: ''
 *            service_rating_description: ''
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The newly updated service rating object
 */
router.put('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  ServiceRatings.updatesServiceRating(id, req.body)
    .then((editedServiceRating) => {
      res.status(200).json({
        message: `Service Rating ${id} updated`,
        status: editedServiceRating,
      });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/serviceRatings/{service_rating_id}:
 *  delete:
 *   summary: Delete a service rating from our system
 *   security:
 *    - okta: []
 *   tags:
 *    - service rating
 *   parameters:
 *    - $ref: '#/components/parameters/service_rating_id'
 *   responses:
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    200:
 *     description: The deleted service rating object
 */
router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  ServiceRatings.removeServiceRating(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `Service Rating ${id} has been removed` });
      } else {
        res
          .status(404)
          .json({ message: `Service Rating ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
