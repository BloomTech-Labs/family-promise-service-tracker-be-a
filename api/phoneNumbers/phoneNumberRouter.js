const express = require('express');
const router = express.Router();
const PhoneNumbers = require('./phoneNumberModel');
const { requireAdmin } = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *   PhoneNumbers:
 *    type: object
 *    properties:
 *     phone_number_id:
 *      type: integer
 *     recipient_id:
 *      type: uuid
 *      description: Foreign key from recipients table
 *     phone_number:
 *      type: string
 *     phone_number_description:
 *      type: text
 *     created_at:
 *      type: string
 *      format: date-time
 *     updated_at:
 *      type: string
 *      format: date-time
 *    required:
 *    - phone_number_id
 *    - recipient_id
 *    - phone_number
 *
 * /api/phoneNumbers:
 *  get:
 *    summary: Returns all phone numbers
 *    security:
 *      - okta: []
 *    tags:
 *      - phone number
 *    responses:
 *      200:
 *        description: Array of all phone numbers
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  PhoneNumbers.findAll()
    .then((phoneNumbers) => {
      res.status(200).json(phoneNumbers);
    })
    .catch(next);
});

/**
 * @swagger
 *  components:
 *  parameters:
 *    phone_number_id:
 *      name: phone_number_id
 *      in: path
 *      description: primary key for phone numbers table
 *      required: true
 *      schema:
 *        type: integer
 * /api/phoneNumbers/{phone_number_id}:
 *  get:
 *    summary: Returns a phone number using phone_number_id
 *    security:
 *      - okta: []
 *    tags:
 *      - phone number
 *    parameters:
 *      - $ref: '#/components/parameters/phone_number_id'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A valid phone number in our system
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  PhoneNumbers.findById(id)
    .then((phoneNumber) => {
      if (phoneNumber) {
        res.status(200).json(phoneNumber);
      } else {
        res.status(404).json({ error: `PhoneNumber ${id} not found` });
      }
    })
    .catch(next);
});

/**
 * @swagger
 * /api/phoneNumbers:
 *  post:
 *    summary: Add a phone number
 *    security:
 *      - okta: []
 *    tags:
 *      - phone number
 *    requestBody:
 *      description: Phone number object to to be added
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            recipient_id: ""
 *            phone_number: ""
 *            phone_number_description: ""
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: A newly created phone number in the system.
 */
router.post('/', requireAdmin, (req, res, next) => {
  PhoneNumbers.createPhoneNumber(req.body)
    .then((newPhoneNumber) => {
      res
        .status(201)
        .json({ message: 'PhoneNumber created', status: newPhoneNumber });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/phoneNumbers/{phone_number_id}:
 *  put:
 *    summary: Update a phone number
 *    security:
 *      - okta: []
 *    tags:
 *      - phone number
 *    parameters:
 *      - $ref: '#/components/parameters/phone_number_id'
 *    requestBody:
 *      description: phone number object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            phone_number_id: ""
 *            recipient_id: ""
 *            phone_number: ""
 *            phone_number_description: ""
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The updated phone number object
 */
router.put('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  PhoneNumbers.updatePhoneNumber(id, req.body)
    .then((editedPhoneNumber) => {
      res.status(200).json({
        message: `PhoneNumber ${id} updated`,
        status: editedPhoneNumber,
      });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/phoneNumbers/{phone_number_id}:
 *  delete:
 *   summary: Delete a phone number
 *   security:
 *    - okta: []
 *   tags:
 *    - phone number
 *   parameters:
 *    - $ref: '#/components/parameters/phone_number_id'
 *   responses:
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    200:
 *     description: The deleted phone number type object
 */
router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;
  PhoneNumbers.removePhoneNumber(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `PhoneNumber ${id} has been removed` });
      } else {
        res
          .status(404)
          .json({ message: `PhoneNumber ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
