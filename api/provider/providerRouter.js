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
 *      description: Foreign key from provider roles table
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
 * /providers:
 *  get:
 *    description: Returns a list of providers
 *    summary: Get a list of all providers
 *    security:
 *      - okta: []
 *    tags:
 *      - provider
 *    responses:
 *      200:
 *        description: array of providers
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Provider'
 *              example:
 *                - id: '00uhjfrwdWAQvD8JV4x6'
 *                  email: 'frank@example.com'
 *                  firstName: 'Frank'
 *                  lastName: 'Martinez'
 *                  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/herm.jpg'
 *                  role: administrator
 *                  created_at: 2021-04-13T18:47:08.529Z
 *                  updated_at: 2021-04-13T18:47:08.529Z
 *                  programs:
 *                   - id: '49365015-1fea-4b56-a635-638388df5c64'
 *                     name: 'Prevention'
 *                     type: 'Prevention'
 *                     description: 'This is the prevention program'
 *                   - id: 'ee313f99-22cf-4a1b-b073-3d6b5c625004'
 *                     name: 'Sheltering'
 *                     type: 'Sheltering'
 *                     description: 'This is the sheltering program'
 *                - id: '013e4ab94d96542e791f'
 *                  email: 'cathy@example.com'
 *                  firstName: 'Cathy'
 *                  lastName: 'Warmund'
 *                  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/geneseleznev/128.jpg'
 *                  role: program_manager
 *                  created_at: 2021-04-13T18:47:08.529Z
 *                  updated_at: 2021-04-13T18:47:08.529Z
 *                  programs:
 *                   - id: '49365015-1fea-4b56-a635-638388df5c64'
 *                     name: 'Prevention'
 *                     type: 'Prevention'
 *                     description: 'This is the prevention program'
 *
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
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
 * components:
 *  parameters:
 *    provider_id:
 *      name: id
 *      in: path
 *      description: ID of the provider to return
 *      required: true
 *      example: 00uhjfrwdWAQvD8JV4x6
 *      schema:
 *        type: string
 *
 * /provider/{id}:
 *  get:
 *    description: Find providers by ID
 *    summary: Returns a single provider
 *    security:
 *      - okta: []
 *    tags:
 *      - provider
 *    parameters:
 *      - $ref: '#/components/parameters/provider_id'
 *    responses:
 *      200:
 *        description: A provider object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Provider'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Provider not found'
 */

// not working atm
router.get('/getServiceProviders', (req, res, next) => {
  Providers.findServiceProviders()
    .then((serviceProviders) => {
      res.status(200).json(serviceProviders);
    })
    .catch(next);
});

// because of okta, the primary key/id for providers is a string
router.get('/:id', (req, res, next) => {
  const id = String(req.params.id);
  Providers.findById(id)
    .then((provider) => {
      if (provider) {
        res.status(200).json(provider);
      } else {
        res.status(404).json({ error: 'Profile Not Found' });
      }
    })
    .catch(next);
});

/**
 * @swagger
 * /provider:
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
 *      200:
 *        description: A provider object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: provider created
 *                provider:
 *                  $ref: '#/components/schemas/Provider'
 */
router.post('/', async (req, res, next) => {
  Providers.addProvider(req.body)
    .then((providers) => {
      res.status(201).json(providers);
    })
    .catch(next);
});

/**
 * @swagger
 * /provider:
 *  put:
 *    summary: Update a provider
 *    security:
 *      - okta: []
 *    tags:
 *      - provider
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
 *                  description: A message about the result
 *                  example: provider created
 *                provider:
 *                  $ref: '#/components/schemas/Provider'
 */
router.put('/:id', canEditProfile, (req, res, next) => {
  const update = req.body;
  const { id } = req.params;
  if (update) {
    Providers.findById(id)
      .then(
        Providers.update(id, update)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'provider updated', provider: updated });
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
 * /provider/{id}:
 *  delete:
 *    summary: Remove a provider
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
 *        description: A provider object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Provider '00uhjfrwdWAQvD8JV4x6' was deleted.
 *                provider:
 *                  $ref: '#/components/schemas/Provider'
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
