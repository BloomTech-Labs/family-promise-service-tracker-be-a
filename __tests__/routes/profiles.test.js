const request = require('supertest');
const express = require('express');
const Profiles = require('../../api/profile/profileModel');
const profileRouter = require('../../api/profile/profileRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/utils/db-helper');
jest.mock('../../api/profile/profileModel');

// mock the auth middlewares completely
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

jest.mock('../../api/middleware/authorization', () => ({
  requireAdmin: (req, res, next) => next(),
  canEditProfile: (req, res, next) => next(),
}));

describe('profiles router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/profile', '/profiles'], profileRouter);
    jest.clearAllMocks();
  });

  describe('GET /profiles', () => {
    it('should return 200', async () => {
      Profiles.findAll.mockResolvedValue([]);
      const res = await request(server).get('/profiles');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Profiles.findAll.mock.calls.length).toBe(1);
    });
  });

  describe('GET /profiles/:id', () => {
    it('should return 200 when profile found', async () => {
      Profiles.findById.mockResolvedValue({
        id: 'd376de0577681ca93614',
        name: 'Bob Smith',
        email: 'bob@example.com',
      });
      const res = await request(server).get('/profiles/d376de0577681ca93614');

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Bob Smith');
      expect(Profiles.findById.mock.calls.length).toBe(1);
    });

    it('should return 404 when no user found', async () => {
      Profiles.findById.mockResolvedValue();
      const res = await request(server).get('/profiles/d376de0577681ca93614');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('ProfileNotFound');
    });
  });

  describe('POST /profile', () => {
    it('should return 200 with stubbed message', async () => {
      const profile = {
        name: 'Louie Smith',
        email: 'louie@example.com',
        avatarUrl:
          'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg',
      };

      const res = await request(server).post('/profile').send(profile);
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/Stubbed method for creating users/);
    });
  });

  describe('PUT /profile', () => {
    it('should return 200 when profile is updated', async () => {
      const profile = {
        id: 'd376de0577681ca93614',
        name: 'Louie Smith',
        email: 'louie@example.com',
        avatarUrl:
          'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg',
      };
      Profiles.findById.mockResolvedValue(profile);
      Profiles.update.mockResolvedValue(profile);

      const res = await request(server)
        .put('/profile/d376de0577681ca93614')
        .send(profile);

      expect(res.status).toBe(200);
      expect(res.body.profile.name).toBe('Louie Smith');
      expect(Profiles.update.mock.calls.length).toBe(1);
    });
  });
});
