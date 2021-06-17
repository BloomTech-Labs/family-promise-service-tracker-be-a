const request = require('supertest');
const express = require('express');
const veteranRouter = require('../../api/veteran/veteranRouter');
const server = express();
server.use(express.json());

// mock the auth middlewares completely
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next());
);

jest.mock('../../api/middleware/authorization', () => ({
  requireAdmin: (req, res, next) => next();
}));

beforeAll( async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  server.use(['/veteran', '/veterans'], veteranRouter);
})
beforeEach( async () => {
  await db.seed.run();
})

describe('veteran router endpoints', () => {
  // GET - findAll
  describe('[GET] /veterans', () => {
    it('status 200' async () => {
      const res = await request(server).get('/veteran');
      expect(res.status).toBe(200);
    });
    it('should return all vets', async () => {
      const res = await request(server).get('/veteran');
      // num of veterans in seed file
      expect(res.body.length).toBe(2);
    });
    it('should have correct values present', async () => {
      const res = await request(server).get('/veteran');
      for(const veteran in res.body.data){
        expect(veteran).toHaveProperty('recipient_id');
        expect(veteran).toHaveProperty('recipient_date_of_birth');
        expect(veteran).toHaveProperty('recipient_veteran_status', true);
      }
    });
  });
});
