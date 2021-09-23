const express = require('express');
const Recipients = require('./recipientModel');
const router = express.Router();
const {
  requireAdmin,
  requireProgramManager,
} = require('../middleware/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *   Recipients:
 *    type: object
 *    properties:
 *     recipient_id:
 *      type: uuid
 *     recipient_first_name:
 *      type: string
 *     recipient_middle_name:
 *      type: string
 *     recipient_last_name:
 *      type: string
 *     recipient_is_active:
 *      type: boolean
 *     recipient_date_of_birth:
 *      type: string
 *      format: date
 *     recipient_veteran_status:
 *      type: boolean
 *     has_disability:
 *      type: boolean
 *     has_valid_ssi:
 *      type: boolean
 *     has_valid_medicare_card:
 *      type: boolean
 *     recipient_notes:
 *      type: text
 *     household_id:
 *      type: uuid
 *      description: Foreign key from households table
 *     gender_id:
 *      type: integer
 *      description: Foreign key from genders table
 *     race_id:
 *      type: integer
 *      description: Foreign key from races table
 *     ethnicity_id:
 *      type: integer
 *      description: Foreign key from ethnicity table
 *     created_at:
 *      type: string
 *      format: date-time
 *     updated_at:
 *      type: string
 *      format: date-time
 *    required:
 *    - recipient_id
 *    - recipient_first_name
 *    - recipient_last_name
 *    - recipient_is_active
 *    - recipient_date_of_birth
 *    - recipient_veteran_status
 *    - has_disability
 *    - has_valid_ssi
 *    - has_valid_medicare_card
 *    - household_id
 *
 * /api/recipients:
 *  get:
 *    summary: Returns all recipients
 *    security:
 *      - okta: []
 *    tags:
 *      - recipient
 *    responses:
 *      200:
 *        description: Array of all recipients in system
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', (req, res, next) => {
  Recipients.findAll()
    .then((recipients) => {
      res.status(200).json(recipients);
    })
    .catch(next);
});

/**
 * @swagger
 *  components:
 *  parameters:
 *    recipient_id:
 *      name: recipient_id
 *      in: path
 *      description: primary key for recipient table
 *      required: true
 *      schema:
 *        type: uuid
 * /api/recipients/{recipient_id}:
 *  get:
 *    summary: Returns a recipient using recipient_id
 *    security:
 *      - okta: []
 *    tags:
 *      - recipient
 *    parameters:
 *      - $ref: '#/components/parameters/recipient_id'
 *    responses:
 *      200:
 *        description: A valid recipient in our system
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Recipients.findById(id)
    .then((recipient) => {
      if (recipient) {
        res.status(200).json(recipient);
      } else {
        res.status(404).json({ error: `Recipient ${id} not found` });
      }
    })
    .catch(next);
});

// GET /veterans & /findRecipient DO NOT WORK

// router.get('/veterans', (req, res, next) => {
//   Recipients.findAll({ 'r.recipient_veteran_status': true })
//     .then((recipients) => {
//       res.status(200).json(recipients);
//     })
//     .catch(next);
// });

// router.get('/findRecipient', (req, res, next) => {
//   const { firstName, middleName, lastName } = req.body;
//   Recipients.findAll({
//     'r.recipient_first_name': firstName,
//     'r.recipient_middle_name': middleName,
//     'r.recipient_last_name': lastName,
//   })
//     .then((recipients) => {
//       if (recipients) {
//         res.status(200).json(recipients);
//       } else {
//         res.status(404).json({ error: `Recipient not found` });
//       }
//     })
//     .catch(next);
// });

/**
 * @swagger
 * /api/recipients:
 *  post:
 *    summary: Add a recipient
 *    security:
 *      - okta: []
 *    tags:
 *      - recipient
 *    requestBody:
 *      description: recipient object to to be added
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            recipient_first_name: ""
 *            recipient_middle_name: ""
 *            recipient_last_name: ""
 *            recipient_is_active: ""
 *            recipient_date_of_birth: ""
 *            recipient_veteran_status: ""
 *            has_disability: ""
 *            has_valid_ssi: ""
 *            has_valid_medicare_card: ""
 *            recipient_notes: ""
 *            household_id: ""
 *            gender_id: ""
 *            race_id: ""
 *            ethnicity_id: ""
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: A newly created recipient in the system.
 */
router.post('/', (req, res, next) => {
  Recipients.createRecipient(req.body)
    .then((newRecipient) => {
      res.status(201).json({ message: 'Recipient created', newRecipient });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/recipients/{recipient_id}:
 *  put:
 *    summary: Update a recipient
 *    security:
 *      - okta: []
 *    tags:
 *      - recipient
 *    parameters:
 *      - $ref: '#/components/parameters/recipient_id'
 *    requestBody:
 *      description: Recipient object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           example:
 *            recipient_id: ""
 *            recipient_first_name: ""
 *            recipient_middle_name: ""
 *            recipient_last_name: ""
 *            recipient_is_active: ""
 *            recipient_date_of_birth: ""
 *            recipient_veteran_status: ""
 *            has_disability: ""
 *            has_valid_ssi: ""
 *            has_valid_medicare_card: ""
 *            recipient_notes: ""
 *            household_id: ""
 *            gender_id: ""
 *            race_id: ""
 *            ethnicity_id: ""
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The updated recipient object
 */
router.put('/:id', requireAdmin, requireProgramManager, (req, res, next) => {
  const { id } = req.params;
  Recipients.updateRecipient(id, req.body)
    .then((editedRecipient) => {
      res.status(200).json({
        message: `Recipient ${id} updated`,
        editedRecipient,
      });
    })
    .catch(next);
});

/**
 * @swagger
 * /api/recipients/{recipient_id}:
 *  delete:
 *   summary: Delete a recipient
 *   security:
 *    - okta: []
 *   tags:
 *    - recipient
 *   parameters:
 *    - $ref: '#/components/parameters/recipient_id'
 *   responses:
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    200:
 *     description: The deleted recipient object
 */
router.delete('/:id', requireAdmin, (req, res, next) => {
  const { id } = req.params;

  Recipients.deleteRecipient(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Recipient ${id} has been removed` });
      } else {
        res.status(404).json({ message: `Recipient ${id} could not be found` });
      }
    })
    .catch(next);
});

module.exports = router;
