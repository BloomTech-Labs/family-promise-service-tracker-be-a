const express = require('express');
const router = express.Router();
const Providers = require('./providerModel');
const { requireAdmin, canEditProfile } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *   Provider:
 *    type: object
 *    properties:
 *     provider_id:
 *      type: string
 *      description: This is provided by Okta
 *      example: '00uk9lxaulDYOiB4H5d8'
 *     provider_role_id:
 *      type: string
 *      description: Foreign key from provider_roles table
 *      example: 1
 *     employee_id:
 *      type: string
 *      example: 'A000'
 *     provider_first_name:
 *      type: string
 *      example: 'Frank'
 *     provider_last_name:
 *      type: string
 *      example: 'Martinez'
 *     provider_email:
 *      type: string
 *      example: 'fm@gmail.com'
 *     provider_phone_number:
 *      type: string
 *      example: '123-456-7890'
 *     provider_avatar_url:
 *      type: string
 *      description: public url of provider avatar
 *      example: 'https://avatars.dicebear.com/api/initials/fm%20Frank.svg'
 *     provider_is_active:
 *      type: boolean
 *      description: defaults to true
 *      example: true
 *     created_at:
 *      type: string
 *      format: date-time
 *      example: '2021-08-23T20:51:26.363Z'
 *     updated_at:
 *      type: string
 *      format: date-time
 *      example: '2021-04-13T18:47:08.529Z'
 *    required:
 *    - provider_id
 *    - provider_role_id
 *    - provider_first_name
 *    - provider_last_name
 *    - provider_is_active
 *
 * /api/provider:
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
 *      example: '00uhjfrwdWAQvD8JV4x3'
 * /api/provider/{provider_id}:
 *  get:
 *    summary: Returns a provider using provider_id
 *    security:
 *      - okta: []
 *    tags:
 *      - provider
 *    parameters:
 *      - $ref: '#/components/parameters/provider_id'
 *    responses:
 *      200:
 *        description: A valid provider in our system
 *        example:
 *         $ref: '#/components/schemas/Provider'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        example: 'Provider not found'
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
 * /api/provider:
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
 *            $ref: '#/components/schemas/Provider'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Provider not found'
 *      201:
 *        description: A newly created provider in the system.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Used to alert the user of a successfully created provider.
 *                  example: 'Provider created'
 *                provider:
 *                  $ref: '#/components/schemas/Provider'
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
 *            $ref: '#/components/schemas/Provider'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A provider object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Used to alert the user of a successfully updated provider.
 *                  example: 'Provider updated'
 *                provider:
 *                  $ref: '#/components/schemas/Provider'
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
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Used to alert the user of a successfully deleted provider.
 *             provider:
 *               $ref: '#/components/schemas/Provider'
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
