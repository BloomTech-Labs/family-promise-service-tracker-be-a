const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('programs')
    .leftJoin('program_providers', {
      'programs.program_id': 'program_providers.program_id',
    })
    .leftJoin('providers', {
      'program_providers.provider_id': 'providers.provider_id',
    })
    .select(knex.raw('programs.*, json_agg(providers.*) as users'))
    .groupBy('programs.program_id');
};

const findById = async (id) => {
  return await knex('programs')
    .leftJoin('program_providers', {
      'programs.program_id': 'program_providers.program_id',
    })
    .leftJoin('providers', {
      'program_providers.provider_id': 'providers.provider_id',
    })
    .select(knex.raw('programs.*, json_agg(providers.*) as users'))
    .where({ 'programs.program_id': id })
    .groupBy('programs.program_id')
    .first();
};

const findBy = async (filter) => {
  return await knex('programs')
    .leftJoin('program_providers', {
      'programs.program_id': 'program_providers.program_id',
    })
    .leftJoin('providers', {
      'program_providers.provider_id': 'providers.provider_id',
    })
    .select(knex.raw('programs.*, json_agg(providers.*) as users'))
    .where(filter)
    .groupBy('programs.program_id')
    .first();
};

module.exports = {
  findAll,
  findById,
  findBy,
};
