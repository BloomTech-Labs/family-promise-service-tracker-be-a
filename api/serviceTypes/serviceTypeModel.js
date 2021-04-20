const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('service_types')
    .leftJoin('services_providers', {
      'service_types.id': 'services_providers.service_type_id',
    })
    .leftJoin('profiles', {
      'services_providers.provider_id': 'profiles.id',
    })
    .select(
      knex.raw('service_types.*, json_agg(profiles.*) as service_providers')
    )
    .groupBy('service_types.id');
};

const findById = async (id) => {
  return await knex('service_types')
    .leftJoin('services_providers', {
      'service_types.id': 'services_providers.service_type_id',
    })
    .leftJoin('profiles', {
      'services_providers.provider_id': 'profiles.id',
    })
    .select(
      knex.raw('service_types.*, json_agg(profiles.*) as service_providers')
    )
    .where({ 'service_types.id': id })
    .groupBy('service_types.id')
    .first();
};

module.exports = {
  findAll,
  findById,
};
