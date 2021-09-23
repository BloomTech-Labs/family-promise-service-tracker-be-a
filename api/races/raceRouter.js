const express = require('express');
const router = express.Router();
const Races = require('./raceModel');
const { requireAdmin } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *   Races:
 *    type: object
 *    properties:
 *     race_id:
 *      type: integer
 *     race:
 *      type: string
 *    required:
 *    - race_id
 *    - race
 *
 * /api/races:
 *  get:
 *    summary: Returns all races
 *    security:
 *      - okta: []
 *    tags:
 *      - race
 *    responses:
 *      200:
 *        description: Array of all races
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  Races.findAll()
    .then((races) => {
      res.status(200).json(races);
    })
    .catch(next);
});

/**
 * @swagger
 *  components:
 *  parameters:
 *    race_id:
 *      name: race_id
 *      in: path
 *      description: primary key for race table
 *      required: true
 *      schema:
 *        type: integer
 * /api/races/{race_id}:
 *  get:
 *    summary: Returns a race using race_id
 *    security:
 *      - okta: []
 *    tags:
 *      - race
 *    parameters:
 *      - $ref: '#/components/parameters/race_id'
 *    responses:
 *      200:
 *        description: A valid race in our system
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Races.findById(id)
    .then((race) => {
      if (race) {
        res.status(200).json(race);
      } else {
        res.status(404).json({ error: `Race ${id} not found` });
      }
    })
    .catch(next);
});

/**
 * @swagger
 * /api/races:
 *  post:
 *    summary: Add a race
 *    security:
 *      - okta: []
 *    tags:
 *      - race
 *    requestBody:
 *      description: Race object to to be added
 *      content:
 *        application/json:
 *         schema:
 *          type: string
 *          example:
 *            race: ''
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: A newly created race in the system.
 */
router.post('/', requireAdmin, (req, res, next) => {
  Races.createRace(req.body)
    .then((newRace) => {
      res.status(201).json({ message: 'Race created', status: newRace });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/races/{race_id}:
 *  put:
 *    summary: Update a race
 *    security:
 *      - okta: []
 *    tags:
 *      - race
 *    parameters:
 *      - $ref: '#/components/parameters/race_id'
 *    requestBody:
 *      description: Race object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            race_id: ""
 *            race: ""
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The newly updated race object
 */
router.put('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  Races.updateRace(id, req.body)
    .then((editedRace) => {
      res.status(200).json({
        message: `Race ${id} updated`,
        status: editedRace,
      });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/races/{race_id}:
 *  delete:
 *   summary: Delete a race from our system
 *   security:
 *    - okta: []
 *   tags:
 *    - race
 *   parameters:
 *    - $ref: '#/components/parameters/race_id'
 *   responses:
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    200:
 *     description: The deleted race object
 */
router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  Races.removeRace(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Race ${id} has been removed` });
      } else {
        res.status(404).json({ message: `Race ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
