const request = require('supertest');
const express = require('express');
const recipientRouter = require('../../api/recipient/recipientRouter');
const DB = require('../../api/utils/db-helper');
const server = express();
server.use(express.json());

// Test User
const testUser1 = {
  id: 1,
  name: "Terrell Davis",
  age: 76,
  ethnicity: "black/african_american",
  address: "36429 Brenda Mills",
  city: "New Damianville",
  state: "HI",
  zip_code: "08259-2106",
  veteran_status: false,
  household_size: 8
};

jest.mock('../../api/utils/db-helper');

// mock the auth middlewares completely
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

jest.mock('../../api/middleware/authorization', () => ({
  requireAdmin: (req, res, next) => next()
}));

describe('status router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/recipient', '/recipients'], recipientRouter);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // GET - findAll
  describe('[GET] /recipient', () => {
    it('should return 200', async () => {
      DB.findAll.mockResolvedValue([]);
      const res = await request(server).get('/recipient');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(DB.findAll.mock.calls.length).toBe(1);
    });
  });
});
