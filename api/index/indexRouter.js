var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *    description: returns the status of the root endpoint
 *    tags:
 *      - index
 *    responses:
 *      200:
 *        description: root is up
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - api
 *              properties:
 *                api:
 *                  type: string
 *                  example: 'up'
 *                timestamp:
 *                  type: integer
 *                  example: 1631894113404
 */
router.get('/', function (req, res) {
  res.status(200).json({ api: 'up', timestamp: Date.now() });
});

module.exports = router;
