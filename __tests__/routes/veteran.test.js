const request = require('supertest');
const express = require('express');
const recipientRouter = require('../../api/recipient/recipientRouter');
const db = require('../../data/db-config');
const server = express();

// mock the auth middlewares completely
// jest.mock('../../api/middleware/authRequired', () =>
//   jest.fn((req, res, next) => next());
// );

// jest.mock('../../api/middleware/authorization', () => ({
//   requireAdmin: (req, res, next) => next();
// }));

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  server.use(['/recipient', '/recipients'], recipientRouter);
});
beforeEach(async () => {
  await db.seed.run();
});

describe('veteran router endpoints', () => {
  // GET - findAll
  describe('[GET] /recipient/veterans', () => {
    it('status 200', async () => {
      const res = await request(server).get('/recipient/veterans');
      expect(res.status).toBe(200);
    });
    it('should return all vets', async () => {
      const res = await request(server).get('/recipient/veterans');
      // num of veterans in seed file
      expect(res.body.length).toBe(2);
    });
    it('should have correct values present', async () => {
      const res = await request(server).get('/recipient/veterans');
      for (const veteran in res.body.data) {
        expect(veteran).toHaveProperty('recipient_id');
        expect(veteran).toHaveProperty('recipient_date_of_birth');
        expect(veteran).toHaveProperty('recipient_veteran_status', true);
      }
    });
  });
});
