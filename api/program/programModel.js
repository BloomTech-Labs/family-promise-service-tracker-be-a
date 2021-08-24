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

const createProgram = async (newProgram) => {
  return await knex('programs').insert(newProgram).returning('*').first();
};

const updateProgram = async (program_id, program_updates) => {
  return await knex('programs')
    .where('program_id', program_id)
    .update(program_updates);
};

// not properly functional
// delete will not be used much, and the implications on the service_types_programs table must be dealt with
const removeProgram = async (id) => {
  return await knex('programs').where('program_id', id).del();
};

module.exports = {
  findAll,
  findById,
  findBy,
  updateProgram,
  createProgram,
  removeProgram,
};
