const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('provider_roles');
};

const findById = async (id) => {
  return await knex('provider_roles').where('provider_role_id', id).first();
  // keeping these for now as a reference
  // .select(knex.raw('provider_roles.*, to_json(locations.*) as location'))
  // .groupBy('provider_roles.provider_role_id', 'locations.location_id');
};

const createProviderRole = async (newProviderRole) => {
  return await knex('provider_roles').insert(newProviderRole, ['*']);
};

const updateProviderRole = async (id, providerRole) => {
  return await knex('provider_roles')
    .where('provider_role_id', id)
    .update(providerRole);
};

const removeProviderRole = async (id) => {
  return await knex('provider_roles').where('provider_role_id', id).del();
};

module.exports = {
  findAll,
  findById,
  createProviderRole,
  updateProviderRole,
  removeProviderRole,
};
