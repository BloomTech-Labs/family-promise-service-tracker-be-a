const express = require('express');
const Providers = require('./providerModel');
const router = express.Router();
const { requireAdmin, canEditProfile } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *    Profile:
 *      type: object
 *      required:
 *        - id
 *        - email
 *        - firstName
 *        - lastName
 *        - role
 *
 *      properties:
 *        id:
 *          type: string
 *          description: This is a foreign key (the okta user ID)
 *        email:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        avatarUrl:
 *          type: string
 *          description: public url of provider avatar
 *        role:
 *          type: string
 *          enum: [administrator|program_manager|service_provider|unnassigned]
 *        created_at:
 *          type: string
 *          format: date-time
 *        updated_at:
 *          type: string
 *          format: date-time
 *        programs:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *              name:
 *                type: string
 *              type:
 *                type: string
 *              description:
 *                type: string
 *      example:
 *        id: '00uhjfrwdWAQvD8JV4x6'
 *        email: 'frank@example.com'
 *        firstName: 'Frank'
 *        lastName: 'Martinez'
 *        avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *        role: administrator
 *        created_at: 2021-04-13T18:47:08.529Z
 *        updated_at: 2021-04-13T18:47:08.529Z
 *        programs:
 *          - id: '49365015-1fea-4b56-a635-638388df5c64'
 *            name: 'Prevention'
 *            type: 'Prevention'
 *            description: 'This is the prevention program'
 *          - id: 'ee313f99-22cf-4a1b-b073-3d6b5c625004'
 *            name: 'Sheltering'
 *            type: 'Sheltering'
 *            description: 'This is the sheltering program'
 *
 *
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
 *                $ref: '#/components/schemas/Profile'
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
router.get('/', function (req, res) {
  Providers.findAll()
    .then((providers) => {
      res.status(200).json(providers);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

/**
 * @swagger
 * components:
 *  parameters:
 *    profileId:
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
 *      - $ref: '#/components/parameters/profileId'
 *    responses:
 *      200:
 *        description: A provider object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Profile'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Profile not found'
 */

router.get('/getServiceProviders', function (req, res) {
  Providers.findServiceProviders()
    .then((serviceProviders) => {
      res.status(200).json(serviceProviders);
    })
    .catch(() => {
      res.status(404).json({ error: 'No Service Providers Found' });
    });
});

router.get('/:id', function (req, res) {
  const id = String(req.params.id);
  Providers.findById(id)
    .then((provider) => {
      if (provider) {
        res.status(200).json(provider);
      } else {
        res.status(404).json({ error: 'ProfileNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
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
 *      description: Profile object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Profile'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Profile not found'
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
 *                  $ref: '#/components/schemas/Profile'
 */
router.post('/', requireAdmin, async (req, res) => {
  res.status(200).json({
    message: 'Stubbed method for creating users - no data was submitted',
  });
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
 *      description: Profile object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Profile'
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
 *                  $ref: '#/components/schemas/Profile'
 */
router.put('/:id', canEditProfile, (req, res) => {
  const update = req.body;
  if (update) {
    const id = req.params.id;
    Providers.findById('providers', id)
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
      .catch((err) => {
        res.status(404).json({
          message: `Could not find provider '${id}'`,
          error: err.message,
        });
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
 *      - $ref: '#/components/parameters/profileId'
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
 *                  example: Profile '00uhjfrwdWAQvD8JV4x6' was deleted.
 *                provider:
 *                  $ref: '#/components/schemas/Profile'
 */
router.delete('/:id', requireAdmin, (req, res) => {
  res.status(200).json({
    message: 'Stubbed method for deleting users - no data was deleted',
  });
});

module.exports = router;
