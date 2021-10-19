const express = require('express');
const ProviderPrograms = require('./providerProgramsModel');
const router = express.Router();
const { requireAdmin, canEditProfile } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *   ServiceTypePrograms:
 *    type: object
 *    properties:
 *     service_type_program_id:
 *      type: integer
 *     program_id:
 *      type: integer
 *      description: Foreign key from programs table
 *     service_type_id:
 *      type: integer
 *      description: Foreign key from service types table
 *    required:
 *    - service_type_program_id
 *    - program_id
 *    - service_type_id
 *
 * /api/serviceTypePrograms:
 *  get:
 *    summary: Returns all service type programs
 *    security:
 *      - okta: []
 *    tags:
 *      - service type program
 *    responses:
 *      200:
 *        description: Array of all service type programs
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  ProviderPrograms.findAll()
    .then((programs) => {
      res.status(200).json(programs);
    })
    .catch(next);
});

/**
 * @swagger
 *  components:
 *  parameters:
 *    service_type_program_id:
 *      name: service_type_program_id
 *      in: path
 *      description: primary key for service type programs table
 *      required: true
 *      schema:
 *        type: integer
 * /api/serviceTypePrograms/{service_type_program_id}:
 *  get:
 *    summary: Returns a service type program using service_type_program_id
 *    security:
 *      - okta: []
 *    tags:
 *      - service type program
 *    parameters:
 *      - $ref: '#/components/parameters/service_type_program_id'
 *    responses:
 *      200:
 *        description: A valid service type program in our system
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', (req, res, next) => {
  const id = String(req.params.id);
  ProviderPrograms.findById(id)
    .then((provider) => {
      res.status(200).json(provider);
    })
    .catch(next);
});

router.post('/', async (req, res, next) => {
  ProviderPrograms.addProvider(req.body)
    .then((provider) => {
      res.status(201).json({
        message: `Provider created with id: ${provider.provider_id}`,
        provider,
      });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/serviceTypePrograms:
 *  post:
 *    summary: Add a service type program
 *    security:
 *      - okta: []
 *    tags:
 *      - service type program
 *    requestBody:
 *      description: service type program object to to be added
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          example:
 *            program_id: ''
 *            service_type_id: ''
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: A newly created service type program in the system.
 */
router.put('/:id', (req, res, next) => {
  const id = String(req.params.id);
  ProviderPrograms.updateProvider(id, req.body)
    .then((updatedProvider) => {
      if (updatedProvider) {
        res.status(200).json(updatedProvider);
      } else {
        res.status(404).json({ error: `Entry ${id} not found` });
      }
    })
    .catch(next);
});

/**
 * @swagger
 * /api/serviceTypePrograms/{service_type_program_id}:
 *  put:
 *    summary: Update a service type program
 *    security:
 *      - okta: []
 *    tags:
 *      - service type program
 *    parameters:
 *      - $ref: '#/components/parameters/service_type_program_id'
 *    requestBody:
 *      description: Service type program object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            service_type_program_id: ''
 *            program_id: ''
 *            service_type_id: ''
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The newly updated service type program object
 */
router.delete('/:id', (req, res, next) => {
  const id = String(req.params.id);
  ProviderPrograms.removeProvider(id)
    .then((result) => {
      res
        .status(200)
        .json({ message: `Provider ${result.provider_id} has been removed` });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/serviceTypePrograms/{service_type_program_id}:
 *  delete:
 *   summary: Delete a service type program from our system
 *   security:
 *    - okta: []
 *   tags:
 *    - service type program
 *   parameters:
 *    - $ref: '#/components/parameters/service_type_program_id'
 *   responses:
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    200:
 *     description: The deleted service type program object
 */
// router.delete('/:id', (req, res, next) => {
//   const { id } = req.params;
//   ServiceTypePrograms.removeServiceTypeProgram(id)
//     .then((count) => {
//       if (count > 0) {
//         res
//           .status(200)
//           .json({ message: `Service Type Program ${id} has been removed` });
//       } else {
//         res
//           .status(404)
//           .json({ message: `Service Type Program ${id} could not be found` });
//       }
//     })
//     .catch(next);
// });

module.exports = router;
