const knex = require('../data/db-config');

module.exports = async () => {
  console.log('global setup');
  try {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  } catch (e) {
    console.warn(e);
    process.exit(1);
  }
};
