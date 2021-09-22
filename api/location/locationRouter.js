const express = require('express');
const Locations = require('./locationModel');
const router = express.Router();
const { requireAdmin } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *   Locations:
 *    type: object
 *    properties:
 *     location_id:
 *      type: uuid
 *     location_type_id:
 *      type: integer
 *      description: Foreign key from location_types table
 *     location_name:
 *      type: string
 *     location_description:
 *      type: string
 *     address:
 *      type: string
 *     address_line2:
 *      type: string
 *     city:
 *      type: string
 *     state:
 *      type: string
 *     zip:
 *      type: string
 *     county:
 *      type: string
 *     country:
 *      type: string
 *     location_longitude:
 *      type: number
 *      format: float
 *     location_latitude:
 *      type: number
 *      format: float
 *     created_at:
 *      type: string
 *      format: date-time
 *     updated_at:
 *      type: string
 *      format: date-time
 *    required:
 *    - location_id
 *    - location_type_id
 *    - address
 *    - city
 *    - state
 *    - zip
 *    - county
 *    - country
 *    - location_longitude
 *    - location_latitude
 *
 * /api/locations:
 *  get:
 *    summary: Returns all locations
 *    security:
 *      - okta: []
 *    tags:
 *      - location
 *    responses:
 *      200:
 *        description: Array of all locations in system
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  Locations.findAll()
    .then((locations) => {
      res.status(200).json(locations);
    })
    .catch(next);
});

/**
 * @swagger
 *  components:
 *  parameters:
 *    location_id:
 *      name: location_id
 *      in: path
 *      description: primary key for location table
 *      required: true
 *      schema:
 *        type: uuid
 * /api/locations/{location_id}:
 *  get:
 *    summary: Returns a location using location_id
 *    security:
 *      - okta: []
 *    tags:
 *      - location
 *    parameters:
 *      - $ref: '#/components/parameters/location_id'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A valid location in our system
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Locations.findById(id)
    .then((Location) => {
      if (Location) {
        res.status(200).json(Location);
      } else {
        res.status(404).json({ error: `Location ${id} not found` });
      }
    })
    .catch(next);
});

/**
 * @swagger
 * /api/locations:
 *  post:
 *    summary: Add a location
 *    security:
 *      - okta: []
 *    tags:
 *      - location
 *    requestBody:
 *      description: Location object to to be added
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            location_type_id: ""
 *            location_name: ""
 *            location_description: ""
 *            address: ""
 *            address_line2: ""
 *            city: ""
 *            state: ""
 *            zip: ""
 *            county: ""
 *            country: ""
 *            location_longitude: ""
 *            location_latitude: ""
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: A newly created location in the system.
 */
router.post('/', (req, res, next) => {
  Locations.createLocation(req.body)
    .then((newLocation) => {
      res.status(201).json({ message: 'Location created', newLocation });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/locations/{location_id}:
 *  put:
 *    summary: Update a location
 *    security:
 *      - okta: []
 *    tags:
 *      - location
 *    parameters:
 *      - $ref: '#/components/parameters/location_id'
 *    requestBody:
 *      description: location object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            location_id: ""
 *            location_type_id: ""
 *            location_name: ""
 *            location_description: ""
 *            address: ""
 *            address_line2: ""
 *            city: ""
 *            state: ""
 *            zip: ""
 *            county: ""
 *            country: ""
 *            location_longitude: ""
 *            location_latitude: ""
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The updated location object
 */
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  Locations.updateLocation(id, req.body)
    .then((editedLocation) => {
      res.status(200).json({
        message: `Location ${id} updated`,
        editedLocation,
      });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/locations/{location_id}:
 *  delete:
 *   summary: Delete a location
 *   security:
 *    - okta: []
 *   tags:
 *    - location
 *   parameters:
 *    - $ref: '#/components/parameters/location_id'
 *   responses:
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    200:
 *     description: The deleted location object
 */
router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  Locations.removeLocation(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Location ${id} has been removed` });
      } else {
        res.status(404).json({ message: `Location ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
