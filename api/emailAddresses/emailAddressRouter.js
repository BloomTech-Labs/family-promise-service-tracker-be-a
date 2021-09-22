const express = require('express');
const router = express.Router();
const EmailAddresses = require('./emailAddressModel');
const { requireAdmin } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *   EmailAddress:
 *    type: object
 *    properties:
 *     email_address_id:
 *      type: integer
 *      example: 55
 *     recipient_id:
 *      type: uuid
 *      description: Foreign key from recipient table
 *      example: '4456de2e-dc93-4ae6-b1cf-cc59c4394e68'
 *     email_address:
 *      type: string
 *      example: 'fakeEmail@gmail.com'
 *     email_address_description:
 *      type: text
 *      example: 'Fathers personal email'
 *     created_at:
 *      type: string
 *      format: date-time
 *      example: '2021-08-23T20:51:26.363Z'
 *     updated_at:
 *      type: string
 *      format: date-time
 *      example: '2021-04-13T18:47:08.529Z'
 *    required:
 *    - email_address_id
 *    - recipient_id
 *    - email_address
 *
 * /api/emailAddress:
 *  get:
 *    summary: Returns all email addresses for recipients
 *    security:
 *      - okta: []
 *    tags:
 *      - email address
 *    responses:
 *      200:
 *        description: Array of all email addresses in system
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  EmailAddresses.findAll()
    .then((emailAddresses) => {
      res.status(200).json(emailAddresses);
    })
    .catch(next);
});

/**
 * @swagger
 *  components:
 *  parameters:
 *    email_address_id:
 *      name: email_address_id
 *      in: path
 *      description: primary key for email addresses table
 *      required: true
 *      schema:
 *        type: integer
 *      example: 23
 * /api/emailAddress/{email_address_id}:
 *  get:
 *    summary: Returns a provider using email_address_id
 *    security:
 *      - okta: []
 *    tags:
 *      - email address
 *    parameters:
 *      - $ref: '#/components/parameters/email_address_id'
 *    responses:
 *      200:
 *        description: A valid email address in our system
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  EmailAddresses.findById(id)
    .then((emailAddress) => {
      if (emailAddress) {
        res.status(200).json(emailAddress);
      } else {
        res.status(404).json({ error: `Email Address ${id} not found` });
      }
    })
    .catch(next);
});

/**
 * @swagger
 * /api/emailAddress:
 *  post:
 *    summary: Add an email address
 *    security:
 *      - okta: []
 *    tags:
 *      - email address
 *    requestBody:
 *      description: Email address object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *             recipient_id: ''
 *             email_address: ''
 *             email_address_description: ''
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: A newly created email in the system.
 */
router.post('/', (req, res, next) => {
  EmailAddresses.createEmailAddress(req.body)
    .then((newEmailAddress) => {
      res
        .status(201)
        .json({ message: 'Email Address created', status: newEmailAddress });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/emailAddress/{email_address_id}:
 *  put:
 *    summary: Update an email address
 *    security:
 *      - okta: []
 *    tags:
 *      - email address
 *    parameters:
 *      - $ref: '#/components/parameters/email_address_id'
 *    requestBody:
 *      description: Email address object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/EmailAddress'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The newly updated email address object
 */
router.put('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  EmailAddresses.updateEmailAddress(id, req.body)
    .then((editedEmailAddress) => {
      res.status(200).json({
        message: `Email address ${id} updated`,
        status: editedEmailAddress,
      });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/emailAddress/{email_address_id}:
 *  delete:
 *   summary: Delete an email address
 *   security:
 *    - okta: []
 *   tags:
 *    - email address
 *   parameters:
 *    - $ref: '#/components/parameters/email_address_id'
 *   responses:
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    200:
 *     description: The deleted email address object
 */
router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  EmailAddresses.removeEmailAddress(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `Email address ${id} has been removed` });
      } else {
        res
          .status(404)
          .json({ message: `Email address ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
