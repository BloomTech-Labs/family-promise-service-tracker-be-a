const express = require('express');
const Maps = require('./mapsModel');
const router = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *   Maps:
 *    type: object
 *    properties:
 *     program_name:
 *      type: string
 *     lat:
 *      type: float
 *     long:
 *      type: float
 *
 * /api/maps:
 *  get:
 *    summary: Returns all map locations
 *    security:
 *      - okta: []
 *    tags:
 *      - map
 *    responses:
 *      200:
 *        description: Array of all map locations
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  Maps.findAllServiceEntryLocations()
    .then((entries) => {
      res.status(200).json(entries);
    })
    .catch(next);
});

module.exports = router;
