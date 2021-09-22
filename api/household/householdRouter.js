const express = require('express');
const router = express.Router();
const Households = require('./householdModel');
const { requireAdmin } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *   Households:
 *    type: object
 *    properties:
 *     household_id:
 *      type: uuid
 *      example: '1b9efd46-0a29-4ed0-9646-4eb01fcb1a77'
 *     location_id:
 *      type: uuid
 *      example: 'ffb7ad0a-e698-4731-b4db-7a632ca9016a'
 *     household_name:
 *      type: string
 *      example: 'The Charles Family'
 *     household_size:
 *      type: integer
 *      example: 8
 *     household_monthly_income:
 *      type: number
 *      example: '840.50'
 *     is_unstable:
 *      type: boolean
 *     created_at:
 *      type: string
 *      format: date-time
 *      example: '2021-08-23T20:51:26.363Z'
 *     updated_at:
 *      type: string
 *      format: date-time
 *      example: '2021-04-13T18:47:08.529Z'
 *    required:
 *    - household_id
 *    - is_unstable
 *
 * /api/households:
 *  get:
 *    summary: Returns all households
 *    security:
 *      - okta: []
 *    tags:
 *      - household
 *    responses:
 *      200:
 *        description: Array of all households
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  Households.findAll()
    .then((households) => {
      res.status(200).json(households);
    })
    .catch(next);
});

/**
 * @swagger
 *  components:
 *  parameters:
 *    household_id:
 *      name: household_id
 *      in: path
 *      description: primary key for household table
 *      required: true
 *      schema:
 *        type: uuid
 *      example: '1b9efd46-0a29-4ed0-9646-4eb01fcb1a77'
 * /api/households/{household_id}:
 *  get:
 *    summary: Returns a household using household_id
 *    security:
 *      - okta: []
 *    tags:
 *      - household
 *    parameters:
 *      - $ref: '#/components/parameters/household_id'
 *    responses:
 *      200:
 *        description: A valid household in our system
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Households.findById(id)
    .then((household) => {
      if (household) {
        res.status(200).json(household);
      } else {
        res.status(404).json({ error: `Household ${id} not found` });
      }
    })
    .catch(next);
});

/**
 * @swagger
 * /api/households:
 *  post:
 *    summary: Add a household
 *    security:
 *      - okta: []
 *    tags:
 *      - household
 *    requestBody:
 *      description: Household object to to be added
 *      content:
 *        application/json:
 *         schema:
 *          properties:
 *           location_id:
 *            type: uuid
 *            example: ''
 *           household_name:
 *            type: string
 *            example: ''
 *           household_size:
 *            type: integer
 *            example:
 *           household_monthly_income:
 *            type: number
 *            example: ''
 *           is_unstable:
 *            type: boolean
 *            example:
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: A newly created household in the system.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Used to alert the user of a successfully created household.
 *                  example: 'Household created'
 *                household:
 *                  $ref: '#/components/schemas/Households'
 */
router.post('/', (req, res, next) => {
  Households.createHousehold(req.body)
    .then((newHousehold) => {
      res.status(201).json({ message: 'Household created', newHousehold });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/households/{household_id}:
 *  put:
 *    summary: Update a household
 *    security:
 *      - okta: []
 *    tags:
 *      - household
 *    parameters:
 *      - $ref: '#/components/parameters/household_id'
 *    requestBody:
 *      description: household object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Households'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A households object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Used to alert the user of a successfully updated household.
 *                  example: 'households updated'
 *                households:
 *                  $ref: '#/components/schemas/Households'
 */
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  Households.updateHousehold(id, req.body)
    .then((editedHousehold) => {
      res.status(200).json({
        message: `Household ${id} updated`,
        editedHousehold,
      });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/households/{household_id}:
 *  delete:
 *   summary: Delete a household
 *   security:
 *    - okta: []
 *   tags:
 *    - household
 *   parameters:
 *    - $ref: '#/components/parameters/household_id'
 *   responses:
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    200:
 *     description: The deleted households object
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Used to alert the user of a successfully deleted household.
 *             households:
 *               $ref: '#/components/schemas/Households'
 */
router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  Households.removeHousehold(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Household ${id} has been removed` });
      } else {
        res.status(404).json({ message: `Household ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
