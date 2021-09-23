const knex = require('../../data/db-config');
const { okta } = require('../../config/okta');

const findAll = async () => {
  return await knex('providers');
};

const findById = async (id) => {
  return await knex('providers').where('provider_id', id).first();
};

const addProvider = async (newProvider) => {
  return await knex('providers').insert(newProvider, ['*']);
};

const updateProvider = async (id, updates) => {
  return await knex('providers').where('provider_id', id).update(updates);
};

const removeProvider = async (id) => {
  return await knex('providers').where('provider_id', id).del();
};

module.exports = {
  findAll,
  findById,
  addProvider,
  updateProvider,
  removeProvider,
};
