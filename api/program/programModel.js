const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('programs')
    .leftJoin('programs_users', {
      'programs.id': 'programs_users.program_id',
    })
    .leftJoin('profiles', {
      'programs_users.profile_id': 'profiles.id',
    })
    .select(knex.raw('programs.*, json_agg(profiles.*) as users'))
    .groupBy('programs.id');
};

const findById = async (id) => {
  return await knex('programs')
    .leftJoin('programs_users', {
      'programs.id': 'programs_users.program_id',
    })
    .leftJoin('profiles', {
      'programs_users.profile_id': 'profiles.id',
    })
    .select(knex.raw('programs.*, json_agg(profiles.*) as users'))
    .where({ 'programs.id': id })
    .groupBy('programs.id')
    .first();
};

const findBy = async (filter) => {
  return await knex('programs')
    .leftJoin('programs_users', {
      'programs.id': 'programs_users.program_id',
    })
    .leftJoin('profiles', {
      'programs_users.profile_id': 'profiles.id',
    })
    .select(knex.raw('programs.*, json_agg(profiles.*) as users'))
    .where(filter)
    .groupBy('programs.id')
    .first();
};

module.exports = {
  findAll,
  findById,
  findBy,
};
