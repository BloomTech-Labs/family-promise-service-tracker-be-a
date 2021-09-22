const express = require('express');
const LocationTypes = require('./locationTypesModel');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   LocationTypes:
 *    type: object
 *    properties:
 *     location_type_id:
 *      type: integer
 *     location_type:
 *      type: string
 *     location_type_description:
 *      type: text
 *     is_recipient_residence:
 *      type: boolean
 *    required:
 *    - location_type_id
 *    - location_type
 *    - is_recipient_residence
 *
 * /api/locationTypes:
 *  get:
 *    summary: Returns all location types
 *    security:
 *      - okta: []
 *    tags:
 *      - location type
 *    responses:
 *      200:
 *        description: Array of all location types
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  LocationTypes.findAll()
    .then((locationTypes) => {
      res.status(200).json(locationTypes);
    })
    .catch(next);
});

/**
 * @swagger
 *  components:
 *  parameters:
 *    location_type_id:
 *      name: location_type_id
 *      in: path
 *      description: primary key for location types table
 *      required: true
 *      schema:
 *        type: integer
 * /api/locationTypes/{location_type_id}:
 *  get:
 *    summary: Returns a location type using location_type_id
 *    security:
 *      - okta: []
 *    tags:
 *      - location type
 *    parameters:
 *      - $ref: '#/components/parameters/location_type_id'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A valid location type in our system
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  LocationTypes.findById(id)
    .then((locationType) => {
      if (locationType) {
        res.status(200).json(locationType);
      } else {
        res.status(404).json({ error: `LocationType ${id} not found` });
      }
    })
    .catch(next);
});

/**
 * @swagger
 * /api/locationTypes:
 *  post:
 *    summary: Add a location type
 *    security:
 *      - okta: []
 *    tags:
 *      - location type
 *    requestBody:
 *      description: Location type object to to be added
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            location_type: ""
 *            location_type_description: ""
 *            is_recipient_residence: ""
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: A newly created location type in the system.
 */
router.post('/', (req, res, next) => {
  LocationTypes.createLocationType(req.body)
    .then((newLocationType) => {
      res
        .status(201)
        .json({ message: 'Location Type created', newLocationType });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/locationTypes/{location_type_id}:
 *  put:
 *    summary: Update a location type
 *    security:
 *      - okta: []
 *    tags:
 *      - location type
 *    parameters:
 *      - $ref: '#/components/parameters/location_type_id'
 *    requestBody:
 *      description: location type object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            location_type_id: ""
 *            location_type: ""
 *            location_type_description: ""
 *            is_recipient_residence: ""
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The updated location type object
 */
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  LocationTypes.updateLocationType(id, req.body)
    .then((response) => {
      return LocationTypes.findById(response[0].location_type_id);
    })
    .then((editedLocationType) => {
      res.status(200).json({
        message: `Location Type ${id} updated`,
        editedLocationType,
      });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/locationTypes/{location_type_id}:
 *  delete:
 *   summary: Delete a location type
 *   security:
 *    - okta: []
 *   tags:
 *    - location type
 *   parameters:
 *    - $ref: '#/components/parameters/location_type_id'
 *   responses:
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    200:
 *     description: The deleted location type object
 */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  LocationTypes.removeLocationType(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `Location Type ${id} has been removed` });
      } else {
        res
          .status(404)
          .json({ message: `Location Type ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
