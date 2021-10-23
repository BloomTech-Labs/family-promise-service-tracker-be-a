const express = require('express');
const Provider = require('./providerModel');
const router = express.Router();
// const { canCrudProgram } = require('../middleware/authorization');
// const { requireAdmin, canEditProfile } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *   Providers:
 *    type: object
 *    properties:
 *     provider_id:
 *      type: string
 *      description: This is provided by Okta, user should copy and paste
 *     provider_role_id:
 *      type: integer
 *      description: Foreign key from provider_roles table
 *     employee_id:
 *      type: string
 *     provider_first_name:
 *      type: string
 *     provider_last_name:
 *      type: string
 *     provider_email:
 *      type: string
 *     provider_phone_number:
 *      type: string
 *     provider_avatar_url:
 *      type: string
 *     provider_is_active:
 *      type: boolean
 *     created_at:
 *      type: string
 *      format: date-time
 *     updated_at:
 *      type: string
 *      format: date-time
 *     programs:
 *      type: array
 *      description: an array of programs from the provider_programs table
 *    required:
 *    - provider_id
 *    - provider_role_id
 *    - provider_first_name
 *    - provider_last_name
 *    - provider_is_active
 *
 * /api/providers:
 *  get:
 *    summary: Returns all providers
 *    security:
 *      - okta: []
 *    tags:
 *      - provider
 *    responses:
 *      200:
 *        description: Array of all providers in system
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  Provider.findAll()
    .then((programs) => {
      res.status(200).json(programs);
    })
    .catch(next);
});

/**
 * @swagger
 *  components:
 *  parameters:
 *    provider_id:
 *      name: provider_id
 *      in: path
 *      description: primary key for providers table
 *      required: true
 *      schema:
 *        type: string
 * /api/providers/{provider_id}:
 *  get:
 *    summary: Returns a provider using provider_id
 *    security:
 *      - okta: []
 *    tags:
 *      - provider
 *    parameters:
 *      - $ref: '#/components/parameters/provider_id'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A valid provider in our system
 */
router.get('/:id', (req, res, next) => {
  const id = String(req.params.id);
  Provider.findById(id)
    .then((provider) => {
      res.status(200).json(provider);
    })
    .catch(next);
});

/**
 * @swagger
 * /api/providers:
 *  post:
 *    summary: Add a provider
 *    security:
 *      - okta: []
 *    tags:
 *      - provider
 *    requestBody:
 *      description: Provider object to to be added
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            provider_id: ''
 *            provider_role_id: ''
 *            employee_id: ''
 *            provider_first_name: ''
 *            provider_last_name: ''
 *            provider_email: ''
 *            provider_phone_number: ''
 *            provider_avatar_url: ''
 *            programs: []
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: A newly created provider in the system.
 */
router.post('/', async (req, res, next) => {
  Provider.addProvider(req.body)
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
 * /api/providers/{provider_id}:
 *  put:
 *    summary: Update a provider
 *    security:
 *      - okta: []
 *    tags:
 *      - provider
 *    parameters:
 *      - $ref: '#/components/parameters/provider_id'
 *    requestBody:
 *      description: Provider object to to be updated. Can be 1 change.
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            provider_role_id: ''
 *            employee_id: ''
 *            provider_first_name: ''
 *            provider_last_name: ''
 *            provider_email: ''
 *            provider_phone_number: ''
 *            provider_avatar_url: ''
 *            programs: []
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The updated provider object
 */
router.put('/:id', (req, res, next) => {
  const id = String(req.params.id);
  Provider.updateProvider(id, req.body)
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
 * /api/providers/{provider_id}:
 *  delete:
 *   summary: Delete a provider (changes provider_is_active to false)
 *   security:
 *    - okta: []
 *   tags:
 *    - provider
 *   parameters:
 *    - $ref: '#/components/parameters/provider_id'
 *   responses:
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    200:
 *     description: The provider is no longer active + the deleted provider object
 */
router.delete('/:id', (req, res, next) => {
  const id = String(req.params.id);
  Provider.removeProvider(id)
    .then((result) => {
      res.status(200).json({
        message: `Provider ${result.provider_id} is no longer active`,
        result,
      });
    })
    .catch(next);
});

module.exports = router;
