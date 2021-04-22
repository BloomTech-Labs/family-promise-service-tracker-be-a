const knex = require('../../data/db-config');

module.exports = async () => {
  try {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    console.log('\n Migrated and seeded database');
  } catch (e) {
    console.warn(e);
    process.exit(1);
  }
};
