const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('ethnicities');
};

const findById = async (id) => {
  return await knex('ethnicities').where('ethnicity_id', id).first();
  // keeping these for now as a reference
  // .select(knex.raw('ethnicities.*, to_json(locations.*) as location'))
  // .groupBy('ethnicities.ethnicity_id', 'locations.location_id');
};

const createEthnicity = async (newEthnicity) => {
  return await knex('ethnicities').insert(newEthnicity, ['*']);
};

const updateEthnicity = async (id, ethnicity) => {
  return await knex('ethnicities').where('ethnicity_id', id).update(ethnicity);
};

const removeEthnicity = async (id) => {
  return await knex('ethnicities').where('ethnicity_id', id).del();
};

module.exports = {
  findAll,
  findById,
  createEthnicity,
  updateEthnicity,
  removeEthnicity,
};
