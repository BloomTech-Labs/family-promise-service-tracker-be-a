const knex = require('../../data/db-config');

const isAssignedToProgram = async (profile, program) => {
  const programs = await knex('programs_users')
    .pluck('program_id')
    .where({ profile_id: profile.id });

  return programs.includes(program);
};

const getProgramFromServiceType = async (serviceTypeId) => {
  await knex('service_types').pluck('program_id').where({ id: serviceTypeId });
};

module.exports = {
  isAssignedToProgram,
  getProgramFromServiceType,
};
