const express = require('express');
const Programs = require('./programModel');
const router = express.Router();
const { canCrudProgram } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *   Programs:
 *    type: object
 *    properties:
 *     program_id:
 *      type: integer
 *     program_name:
 *      type: string
 *     program_description:
 *      type: text
 *     program_is_active:
 *      type: boolean
 *     created_at:
 *      type: string
 *      format: date-time
 *     updated_at:
 *      type: string
 *      format: date-time
 *    required:
 *    - program_id
 *    - program_name
 *    - program_is_active
 *
 * /api/programs:
 *  get:
 *    summary: Returns all programs
 *    security:
 *      - okta: []
 *    tags:
 *      - program
 *    responses:
 *      200:
 *        description: Array of all programs in system
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  Programs.findAll()
    .then((programs) => {
      res.status(200).json(programs);
    })
    .catch(next);
});

/**
 * @swagger
 *  components:
 *  parameters:
 *    program_id:
 *      name: program_id
 *      in: path
 *      description: primary key for programs table
 *      required: true
 *      schema:
 *        type: integer
 * /api/programs/{program_id}:
 *  get:
 *    summary: Returns a program using program_id
 *    security:
 *      - okta: []
 *    tags:
 *      - program
 *    parameters:
 *      - $ref: '#/components/parameters/program_id'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A valid program in our system
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Programs.findById(id)
    .then((program) => {
      if (program) {
        res.status(200).json(program);
      } else {
        res.status(404).json({ error: `Program ${id} not found` });
      }
    })
    .catch(next);
});

/**
 * @swagger
 * /api/programs:
 *  post:
 *    summary: Add a program
 *    security:
 *      - okta: []
 *    tags:
 *      - program
 *    requestBody:
 *      description: Program object to to be added
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            program_name: ""
 *            program_description: ""
 *            program_is_active: ""
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      201:
 *        description: A newly created program in the system.
 */
router.post('/', canCrudProgram, (req, res, next) => {
  Programs.createProgram(req.body, req.profile.provider_id)
    .then((newProgram) => {
      res.status(201).json(newProgram);
    })
    .catch(next);
});

/**
 * @swagger
 * /api/programs/{program_id}:
 *  put:
 *    summary: Update a program
 *    security:
 *      - okta: []
 *    tags:
 *      - program
 *    parameters:
 *      - $ref: '#/components/parameters/program_id'
 *    requestBody:
 *      description: Program object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            program_id: ''
 *            program_name: ""
 *            program_description: ""
 *            program_is_active: ""
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The updated program object
 */
router.put('/:id', canCrudProgram, (req, res, next) => {
  const { id } = req.params;
  Programs.updateProgram(id, req.body)
    .then((editedProgram) => {
      res.status(200).json(editedProgram);
    })
    .catch(next);
});

/**
 * @swagger
 * /api/programs/{program_id}:
 *  delete:
 *   summary: Delete a program
 *   security:
 *    - okta: []
 *   tags:
 *    - program
 *   parameters:
 *    - $ref: '#/components/parameters/program_id'
 *   responses:
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    200:
 *     description: The deleted program object
 */
router.delete('/:id', canCrudProgram, (req, res, next) => {
  const { id } = req.params;
  Programs.removeProgram(id)
    .then((result) => {
      res.status(200).json({
        message: `Program ${result.program_id} is no longer active`,
        result,
      });
    })
    .catch(next);
});

module.exports = router;
