const knex = require('../../data/db-config');

const isAssignedToProgram = async (provider, program) => {
  // DEPRICATED????
  const programs = await knex('providers')
    .pluck('program_id')
    .where({ provider_id: provider.provider_id });

  return programs.includes(program);
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
