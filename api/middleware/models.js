const knex = require('../../data/db-config');

const isAssignedToProgram = async (provider, program) => {
  const providerToProgram = await knex('provider_programs')
    .where('program_id', program)
    .andWhere('provider_id', provider);
  return providerToProgram.length > 0;
};

const getProgramFromServiceType = async (serviceTypeId) => {
  // NEEDS TO BE FIXED, old paradigm
  await knex('service_types')
    .pluck('program_id')
    .where({ service_type_id: serviceTypeId });
};

module.exports = {
  isAssignedToProgram,
  getProgramFromServiceType,
};
