const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('genders');
};

const findById = async (id) => {
  return await knex('genders').where('gender_id', id).first();
  // keeping these for now as a reference
  // .select(knex.raw('genders.*, to_json(locations.*) as location'))
  // .groupBy('genders.gender_id', 'locations.location_id');
};

const createGender = async (newGender) => {
  return await knex('genders').insert(newGender, ['*']);
};

const updateGender = async (id, gender) => {
  return await knex('genders').where('gender_id', id).update(gender);
};

const removeGender = async (id) => {
  return await knex('genders').where('gender_id', id).del();
};

module.exports = {
  findAll,
  findById,
  createGender,
  updateGender,
  removeGender,
};
