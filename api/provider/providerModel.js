const knex = require('../../data/db-config');
const { okta } = require('../../config/okta');

const findAll = async () => {
  return await knex('providers');
  // kept for example
  //     .select(knex.raw('providers.*, json_agg(programs.*) as programs'))
  //     .groupBy('providers.provider_id');
};

const findById = async (id) => {
  return await knex('providers').where('provider_id', id).first();
  //     .select(knex.raw('providers.*, json_agg(programs.*) as programs'))
  //     .where({ 'providers.provider_id': id })
  //     .groupBy('providers.provider_id')
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
  findServiceProviders,
  removeProvider,
};
