const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('location_types');
};

const findById = async (id) => {
  return await knex('location_types').where('location_type_id', id).first();
};

const createLocationType = async (newLocationType) => {
  return await knex('location_types').insert(newLocationType, ['*']);
};

const updateLocationType = (id, object) => {
  return knex('location_types').where({ location_type_id: id }).update(object);
};

const removeLocationType = (id) => {
  return knex('location_types').where('location_type_id', id).del();
};

module.exports = {
  findAll,
  findById,
  createLocationType,
  updateLocationType,
  removeLocationType,
};
