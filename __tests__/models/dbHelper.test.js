const DB = require('../../api/utils/db-helper');
const knex = require('../../data/db-config');

describe('DB Helper Methods', () => {
  beforeAll(async () => {
    jest.clearAllMocks();
    try {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      await knex.seed.run();
    } catch (e) {
      console.warn(e);
      process.exit(1);
    }
  });

  afterAll(async () => {
    // kill the database connections after tests
    // have run to make sure Jest can exit
    await knex.destroy();
    await DB.knex.destroy();
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
    it('should return 3 records for service_types', async () => {
      const rows = await DB.findAll('service_types');
      expect(rows.length).toBe(3);
    });
  });
});
