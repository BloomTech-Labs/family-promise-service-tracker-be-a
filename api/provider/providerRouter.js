const express = require('express');
const router = express.Router();
const Providers = require('./providerModel');
const { requireAdmin, canEditProfile } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *   Providers:
 *    type: object
 *    properties:
 *     provider_id:
 *      type: string
 *      description: This is provided by Okta
 *     provider_role_id:
 *      type: string
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
  Providers.findAll()
    .then((providers) => {
      res.status(200).json(providers);
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
  Providers.findById(id)
    .then((provider) => {
      if (provider) {
        res.status(200).json(provider);
      } else {
        res.status(404).json({ error: 'Provider Not Found' });
      }
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
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: A newly created provider in the system.
 */
router.post('/', async (req, res, next) => {
  Providers.addProvider(req.body)
    .then((providers) => {
      res.status(201).json({ message: 'Provider created', providers });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/provider/{provider_id}:
 *  put:
 *    summary: Update a provider
 *    security:
 *      - okta: []
 *    tags:
 *      - provider
 *    parameters:
 *      - $ref: '#/components/parameters/provider_id'
 *    requestBody:
 *      description: Provider object to to be updated
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
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The updated provider object
 */
router.put('/:id', canEditProfile, (req, res, next) => {
  const update = req.body;
  const { id } = req.params;
  if (update) {
    Providers.findById(id)
      .then(
        Providers.updateProvider(id, update)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'Provider updated', provider: updated });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update provider '${id}'`,
              error: err.message,
            });
          })
      )
      .catch(next);
  } else {
    res.status(500).json({
      message: `Could not update provider '${id}'`,
    });
  }
});

/**
 * @swagger
 * /api/provider/{provider_id}:
 *  delete:
 *   summary: Delete a provider
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
 *     description: The deleted provider object
 */
router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  Providers.removeProvider(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Provider ${id} has been removed` });
      } else {
        res.status(404).json({ message: `Provider ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
