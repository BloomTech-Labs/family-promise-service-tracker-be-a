const knex = require('../../data/db-config');

module.exports = () => {
  knex.destroy();
  console.log('\n Database connection destroyed');
};
