const DB = require('../utils/db-helper');
const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('profiles')
    .leftJoin('programs_users', {
      'profiles.id': 'programs_users.profile_id',
    })
    .leftJoin('programs', {
      'programs_users.program_id': 'programs.id',
    })
    .select(knex.raw('profiles.*, json_agg(programs.*) as programs'))
    .groupBy('profiles.id');
};

const findById = async (id) => {
  return await knex('profiles')
    .leftJoin('programs_users', {
      'profiles.id': 'programs_users.profile_id',
    })
    .leftJoin('programs', {
      'programs_users.program_id': 'programs.id',
    })
    .select(knex.raw('profiles.*, json_agg(programs.*) as programs'))
    .where({ 'profiles.id': id })
    .groupBy('profiles.id')
    .first();
};

const findOrCreateProfile = async (profileObj) => {
  const foundProfile = await DB.findById('profiles', profileObj.id).then(
    (profile) => profile
  );
  if (foundProfile) {
    return foundProfile;
  } else {
    // create temp avaturl with initials of name
    profileObj = {
      ...profileObj,
      avatarUrl: `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
        profileObj.name
      )}.svg`,
    };
    return await DB.create('profiles', profileObj).then((newProfile) => {
      return newProfile ? newProfile[0] : newProfile;
    });
  }
};

module.exports = {
  findAll,
  findById,
  findOrCreateProfile,
};
