const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('locations');
};

const findById = async (id) => {
  return await knex('locations').where('location_id', id).first();
};

const createLocation = async (newLocation) => {
  return await knex('locations').insert(newLocation, ['*']);
};

const updateLocation = async (id, location) => {
  return await knex('locations').where('location_id', id).update(location);
};

const removeLocation = async (id) => {
  return await knex('locations').where('location_id', id).del();
};

module.exports = {
  findAll,
  findById,
  createLocation,
  updateLocation,
  removeLocation,
};
