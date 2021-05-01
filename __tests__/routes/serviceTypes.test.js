const request = require('supertest');
const express = require('express');
const ServiceTypes = require('../../api/serviceTypes/serviceTypeModel');
const DB = require('../../api/utils/db-helper');
const serviceTypeRouter = require('../../api/serviceTypes/serviceTypeRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/utils/db-helper');
jest.mock('../../api/serviceTypes/serviceTypeModel');

// mock the auth middlewares completely
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

jest.mock('../../api/middleware/authorization', () => ({
  canCrudServiceType: (req, res, next) => next(),
}));

describe('service types router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/service_type', '/service_types'], serviceTypeRouter);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /service_types', () => {
    it('should return 200', async () => {
      ServiceTypes.findAll.mockResolvedValue([]);
      const res = await request(server).get('/service_types');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(ServiceTypes.findAll.mock.calls.length).toBe(1);
    });
  });

  describe('GET /service_types/:id', () => {
    it('should return 200 when service type found', async () => {
      ServiceTypes.findById.mockResolvedValue({
        id: '1',
        name: 'Bus Passes',
        description: 'Monthly allowance for bus pass',
      });
      const res = await request(server).get('/service_types/1');

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Bus Passes');
      expect(ServiceTypes.findById.mock.calls.length).toBe(1);
    });

    it('should return 404 when no service type found', async () => {
      ServiceTypes.findById.mockResolvedValue();
      const res = await request(server).get('/service_types/245');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Service Type 245 not found');
    });
  });

  describe('POST /service_type', () => {
    it('should return 201 with created service type', async () => {
      const serviceType = {
        name: 'Bus Pass',
        description: 'Monthly bus pass allowance',
        program: 1,
      };
      ServiceTypes.create.mockResolvedValue(serviceType);
      const res = await request(server).post('/service_type').send(serviceType);
      expect(res.status).toBe(201);
      expect(res.body.message).toMatch(/New service type created/);
      expect(ServiceTypes.create.mock.calls.length).toBe(1);
    });
  });

  describe('PUT /service_type/:id', () => {
    it('should return 200 when service type is updated', async () => {
      const service = { name: 'Rental Assistance' };
      DB.findById.mockResolvedValue(service);
      ServiceTypes.update.mockResolvedValue(service);

      const res = await request(server).put('/service_types/1').send(service);
      expect(res.status).toBe(200);
      expect(res.body.service_type.name).toBe('Rental Assistance');
      expect(ServiceTypes.update.mock.calls.length).toBe(1);
    });
  });

  describe('DELETE /service_type/:id', () => {
    it('should return 200 when service_type is deleted', async () => {
      DB.remove.mockResolvedValue(1);
      const res = await request(server).delete('/service_type/5');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Service Type 5 has been removed');
      expect(DB.remove.mock.calls.length).toBe(1);
    });

    it('should return 404 when service_type id is invalid', async () => {
      DB.remove.mockResolvedValue(0);
      const res = await request(server).delete('/service_type/5');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Service Type 5 could not be found');
      expect(DB.remove.mock.calls.length).toBe(1);
    });
  });
});
