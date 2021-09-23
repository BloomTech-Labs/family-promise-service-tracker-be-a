const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('households as h');
};

const findById = async (id) => {
  return await knex('households').where('household_id', id).first();
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
