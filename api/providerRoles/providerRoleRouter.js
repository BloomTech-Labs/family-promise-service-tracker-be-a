const express = require('express');
const router = express.Router();
const ProviderRoles = require('./providerRoleModel');
const { requireAdmin } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *   ProviderRoles:
 *    type: object
 *    properties:
 *     provider_role_id:
 *      type: integer
 *     provider_role:
 *      type: string
 *     provider_role_description:
 *      type: text
 *    required:
 *    - provider_role_id
 *    - provider_role
 *
 * /api/providerRoles:
 *  get:
 *    summary: Returns all provider roles
 *    security:
 *      - okta: []
 *    tags:
 *      - provider role
 *    responses:
 *      200:
 *        description: Array of all provider roles
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  ProviderRoles.findAll()
    .then((providerRoles) => {
      res.status(200).json(providerRoles);
    })
    .catch(next);
});

/**
 * @swagger
 *  components:
 *  parameters:
 *    provider_role_id:
 *      name: provider_role_id
 *      in: path
 *      description: primary key for provider roles table
 *      required: true
 *      schema:
 *        type: integer
 * /api/providerRoles/{provider_role_id}:
 *  get:
 *    summary: Returns a provider role using provider_role_id
 *    security:
 *      - okta: []
 *    tags:
 *      - provider role
 *    parameters:
 *      - $ref: '#/components/parameters/provider_role_id'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A valid provider role in our system
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  ProviderRoles.findById(id)
    .then((providerRole) => {
      if (providerRole) {
        res.status(200).json(providerRole);
      } else {
        res.status(404).json({ error: `Provider Role ${id} not found` });
      }
    })
    .catch(next);
});

/**
 * @swagger
 * /api/providerRoles:
 *  post:
 *    summary: Add a provider role
 *    security:
 *      - okta: []
 *    tags:
 *      - provider role
 *    requestBody:
 *      description: Provider role object to to be added
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            provider_role: ""
 *            provider_role_description: ""
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: A newly created provider role in the system.
 */
router.post('/', requireAdmin, (req, res, next) => {
  ProviderRoles.createProviderRole(req.body)
    .then((newProviderRole) => {
      res
        .status(201)
        .json({ message: 'Provider Role created', status: newProviderRole });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/providerRoles/{provider_role_id}:
 *  put:
 *    summary: Update a provider role
 *    security:
 *      - okta: []
 *    tags:
 *      - provider role
 *    parameters:
 *      - $ref: '#/components/parameters/provider_role_id'
 *    requestBody:
 *      description: provider role object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            provider_role_id: ""
 *            provider_role: ""
 *            provider_role_description: ""
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The updated provider role object
 */
router.put('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  ProviderRoles.updateProviderRole(id, req.body)
    .then((editedProviderRole) => {
      res.status(200).json({
        message: `ProviderRole ${id} updated`,
        status: editedProviderRole,
      });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/providerRoles/{provider_role_id}:
 *  delete:
 *   summary: Delete a provider role
 *   security:
 *    - okta: []
 *   tags:
 *    - provider role
 *   parameters:
 *    - $ref: '#/components/parameters/provider_role_id'
 *   responses:
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    200:
 *     description: The deleted provider role object
 */
router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  ProviderRoles.removeProviderRole(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `Provider Role ${id} has been removed` });
      } else {
        res
          .status(404)
          .json({ message: `Provider Role ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
