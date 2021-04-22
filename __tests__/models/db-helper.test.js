const DB = require('../../api/utils/db-helper');

describe('DB Helper Methods', () => {
  beforeAll(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    // kill the database connection after tests
    // have run to make sure Jest can exit
    DB.knex.destroy();
  });

  describe('DB.findAll', () => {
    it('should return 4 records for statuses', async () => {
      const rows = await DB.findAll('statuses');
      expect(rows.length).toBe(4);
    });
    it('should return 3 records for programs', async () => {
      const rows = await DB.findAll('programs');
      expect(rows.length).toBe(3);
    });
    it('should return 4 records for service_types', async () => {
      const rows = await DB.findAll('service_types');
      expect(rows.length).toBe(3);
    });
  });
});
