const request = require('supertest');
const express = require('express');
const statusRouter = require('../../api/statuses/statusesRouter');
const DB = require('../../api/utils/db-helper');
const server = express();
server.use(express.json());

jest.mock('../../api/utils/db-helper');

// mock the auth middlewares completely
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

jest.mock('../../api/middleware/authorization', () => ({
  requireAdmin: (req, res, next) => next(),
}));

describe('status router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/status', '/statuses'], statusRouter);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /statuses', () => {
    it('should return 200', async () => {
      DB.findAll.mockResolvedValue([]);
      const res = await request(server).get('/statuses');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(DB.findAll.mock.calls.length).toBe(1);
    });
  });

  describe('GET /statuses/:id', () => {
    it('should return 200 when status found', async () => {
      DB.findById.mockResolvedValue({
        id: '1',
        name: 'In Progress',
      });
      const res = await request(server).get('/status/1');

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('In Progress');
      expect(DB.findById.mock.calls.length).toBe(1);
    });

    it('should return 404 when no status found', async () => {
      DB.findById.mockResolvedValue();
      const res = await request(server).get('/status/7');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Status 7 not found');
    });
  });

  describe('POST /status', () => {
    it('should return 201 with new status', async () => {
      const status = { name: 'Needs Attention' };
      DB.create.mockResolvedValue(status);
      const res = await request(server).post('/status').send(status);

      expect(res.status).toBe(201);
      expect(res.body.message).toMatch(/Status created/);
      expect(res.body.status.name).toBe('Needs Attention');
      expect(DB.create.mock.calls.length).toBe(1);
    });
  });

  describe('PUT /status/:id', () => {
    it('should return 200 when status is updated', async () => {
      const status = { id: '5', name: 'Needs Attention' };
      DB.update.mockResolvedValue([status]);
      const res = await request(server).put('/status/5').send(status);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Status 5 updated');
      expect(res.body.status.name).toBe('Needs Attention');
      expect(DB.update.mock.calls.length).toBe(1);
    });
  });

  describe('DELETE /status/:id', () => {
    it('should return 200 when status is deleted', async () => {
      DB.remove.mockResolvedValue(1);
      const res = await request(server).delete('/status/5');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Status 5 has been removed');
      expect(DB.remove.mock.calls.length).toBe(1);
    });

    it('should return 404 when status id is invalid', async () => {
      DB.remove.mockResolvedValue(0);
      const res = await request(server).delete('/status/5');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Status 5 could not be found');
      expect(DB.remove.mock.calls.length).toBe(1);
    });
  });
});
