const ServiceType = require('../../api/serviceTypes/serviceTypeModel');

describe('Service Type Model Methods', () => {
  beforeAll(async () => {
    jest.clearAllMocks();
    try {
      await ServiceType.knex.migrate.rollback();
      await ServiceType.knex.migrate.latest();
      await ServiceType.knex.seed.run();
    } catch (e) {
      console.warn(e);
      process.exit(1);
    }
  });

  afterAll(async () => {
    // kill the database connections after tests
    // have run to make sure Jest can exit
    await ServiceType.knex.destroy();
  });

  describe('ServiceType.findAll', () => {
    it('should return 3 records', async () => {
      const rows = await ServiceType.findAll();
      expect(rows.length).toBe(3);
    });
  });

  describe('ServiceType.findById', () => {
    it('should return correct record when given valid ID', async () => {
      const serviceType = await ServiceType.findById(1);
      expect(serviceType.name).toBe('Bus Passes');
      expect(serviceType.service_providers.length).toBe(2);
    });
    it('should return no records when given invalid ID', async () => {
      const serviceType = await ServiceType.findById(5);
      expect(serviceType).toBe(undefined);
    });
  });

  describe('ServiceType.create', () => {
    it('should create new service type when valid', async () => {
      // ensure we have right number of records in DB to start
      const startRecords = await ServiceType.findAll();
      expect(startRecords.length).toBe(3);

      // then create new service type
      const newRecord = await ServiceType.create({
        name: 'Brand New Service',
        description: 'A good service for good people',
        program_id: 1,
        service_providers: ['00uk9lxaulDYOiB4H5d6'],
      });

      // test the returned object
      expect(newRecord.name).toBe('Brand New Service');
      expect(newRecord.service_providers.length).toBe(1);
      // test that we've correctly added to DB
      const allRecords = await ServiceType.findAll();
      expect(allRecords.length).toBe(4);
    });
  });
});
