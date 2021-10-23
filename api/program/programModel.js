const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('programs');
};

const findById = async (id) => {
  return await knex('programs').where('program_id', id).first();
};

const findBy = async (filter) => {
  return await knex('programs')
    .select(knex.raw('programs.*'))
    .where(filter)
    .groupBy('program_id')
    .first();
};

const createProgram = async (newProgram, providerId) => {
  const [program] = await knex('programs').insert(newProgram, ['*']);
  await knex('provider_programs').insert({
    program_id: program.program_id,
    provider_id: providerId,
  });
  return program;
};

const updateProgram = async (program_id, program_updates) => {
  await knex('programs')
    .where('program_id', program_id)
    .update(program_updates);
  return findById(program_id);
};

// not properly functional
// delete will not be used much, and the implications on the service_types_programs table must be dealt with
const removeProgram = async (id) => {
  await knex('programs')
    .where('program_id', id)
    .update('program_is_active', false);
  return findById(id);
};

module.exports = {
  findAll,
  findById,
  findBy,
  updateProgram,
  createProgram,
  removeProgram,
};
