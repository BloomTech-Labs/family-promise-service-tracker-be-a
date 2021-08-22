const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('programs');
};

const findById = async (id) => {
  return await knex('programs').where('program_id', id).first();
};

const findBy = async (filter) => {
  return await knex('programs').first(); // TEMP to prevent break
  //   return await knex('programs')
  //     .leftJoin('program_providers', {
  //       'programs.program_id': 'program_providers.program_id',
  //     })
  //     .leftJoin('providers', {
  //       'program_providers.provider_id': 'providers.provider_id',
  //     })
  //     .select(knex.raw('programs.*, json_agg(providers.*) as users'))
  //     .where(filter)
  //     .groupBy('programs.program_id')
  //     .first();
};

// const updateProgram = async (program_id, program_updates) => {
//   return await knex('programs');
// };

// const createProgram = async (newProgram) => {
//   return await knex('programs');
// };

// const deleteProgram = async (id) => {
//   return await knex('programs');
// };

module.exports = {
  findAll,
  findById,
  findBy,
  //   updateProgram,
  //   createProgram,
  //   deleteProgram,
};
