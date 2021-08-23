const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('households');
};

const findById = async (id) => {
  return await knex('households').where('household_id', id).first();
  // keeping these for now as a reference
  // .select(knex.raw('households.*, to_json(locations.*) as location'))
  // .groupBy('households.household_id', 'locations.location_id');
};

const createHousehold = async (newHousehold) => {
  return await knex('households').insert(newHousehold, ['*']);
};

const updateHousehold = async (id, household) => {
  return await knex('households').where('household_id', id).update(household);
};

const removeHousehold = async (id) => {
  return await knex('households').where('household_id', id).del();
};

module.exports = {
  findAll,
  findById,
  createHousehold,
  updateHousehold,
  removeHousehold,
};
