const express = require('express');
const Genders = require('./genderModel');
const router = express.Router();
const { requireAdmin } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *   Genders:
 *    type: object
 *    properties:
 *     gender_id:
 *      type: integer
 *     gender:
 *      type: string
 *    required:
 *    - gender_id
 *    - gender
 *
 * /api/genders:
 *  get:
 *    summary: Returns all genders
 *    security:
 *      - okta: []
 *    tags:
 *      - gender
 *    responses:
 *      200:
 *        description: Array of all Genders
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  Genders.findAll()
    .then((genders) => {
      res.status(200).json(genders);
    })
    .catch(next);
});

/**
 * @swagger
 *  components:
 *  parameters:
 *    gender_id:
 *      name: gender_id
 *      in: path
 *      description: primary key for genders table
 *      required: true
 *      schema:
 *        type: integer
 * /api/genders/{gender_id}:
 *  get:
 *    summary: Returns a gender using gender_id
 *    security:
 *      - okta: []
 *    tags:
 *      - gender
 *    parameters:
 *      - $ref: '#/components/parameters/gender_id'
 *    responses:
 *      200:
 *        description: A valid gender in our system
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Genders.findById(id)
    .then((gender) => {
      if (gender) {
        res.status(200).json(gender);
      } else {
        res.status(404).json({ error: `Gender ${id} not found` });
      }
    })
    .catch(next);
});

/**
 * @swagger
 * /api/genders:
 *  post:
 *    summary: Add a gender
 *    security:
 *      - okta: []
 *    tags:
 *      - gender
 *    requestBody:
 *      description: Gender object to to be added
 *      content:
 *        application/json:
 *         schema:
 *          type: string
 *          example:
 *            gender: ''
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: A newly created ethnicity in the system.
 */
router.post('/', requireAdmin, (req, res, next) => {
  Genders.createGender(req.body)
    .then((newGender) => {
      res.status(201).json({ message: 'Gender created', status: newGender });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/genders/{gender_id}:
 *  put:
 *    summary: Update a gender
 *    security:
 *      - okta: []
 *    tags:
 *      - gender
 *    parameters:
 *      - $ref: '#/components/parameters/gender_id'
 *    requestBody:
 *      description: Gender object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Genders'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The newly updated gender object
 */
router.put('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  Genders.updateGender(id, req.body)
    .then((editedGender) => {
      res.status(200).json({
        message: `Gender ${id} updated`,
        status: editedGender,
      });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/genders/{gender_id}:
 *  delete:
 *   summary: Delete a gender
 *   security:
 *    - okta: []
 *   tags:
 *    - gender
 *   parameters:
 *    - $ref: '#/components/parameters/gender_id'
 *   responses:
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    200:
 *     description: The deleted gender object
 */
router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  Genders.removeGender(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Gender ${id} has been removed` });
      } else {
        res.status(404).json({ message: `Gender ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
