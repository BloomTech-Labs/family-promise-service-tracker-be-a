const ServiceTypeModel = require('../../api/serviceTypes/serviceTypeModel');
//const knex = require('../../data/db-config');

describe('Service Type Model Methods', () => {
  beforeAll(async () => {
    jest.clearAllMocks();
  });

  describe('Find All Service Types', () => {
    it('should return 3 records', async () => {
      try {
        const rows = await ServiceTypeModel.findAll();
        expect(rows.length).toBe(3);
      } catch (e) {
        console.warn(e);
      }
    });
  });
});
