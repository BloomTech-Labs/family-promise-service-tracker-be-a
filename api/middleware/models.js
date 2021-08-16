const knex = require('../../data/db-config');

const isAssignedToProgram = async (provider, program) => {
  const programs = await knex('program_providers')
    .pluck('program_id')
    .where({ provider_id: provider.provider_id });

  return programs.includes(program);
};

const getProgramFromServiceType = async (serviceTypeId) => {
  await knex('service_types')
    .pluck('program_id')
    .where({ service_type_id: serviceTypeId });
};

module.exports = {
  isAssignedToProgram,
  getProgramFromServiceType,
};
