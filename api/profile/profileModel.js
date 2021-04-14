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

const update = async (id, updates) => {
  const { programs, ...profile } = updates;

  try {
    // set up a postgres transaction to make sure
    // we're not making partial updates
    await knex.transaction(async (trx) => {
      // only make updates to profile table if there are any
      if (Object.keys(profile).length > 0) {
        await knex('profiles')
          .where({ id })
          .first()
          .update(profile)
          .transacting(trx);
      }
      // if request includes a programs array,
      // first wipe existing associations
      if (programs) {
        await knex('programs_users')
          .where('profile_id', id)
          .delete()
          .transacting(trx);
      }
      // then insert new associations if there are any
      if (programs && programs.length > 0) {
        await knex('programs_users')
          .insert(
            programs.map((p) => {
              return {
                program_id: p,
                profile_id: id,
              };
            })
          )
          .transacting(trx);
      }
    });
    // if transaction hasn't failed out, return
    // promise with updated profile object
    return await findById(id);
  } catch (err) {
    // if transaction fails, forward the error
    // to the router to be resolved
    throw new Error(err);
  }
};

const findOrCreateProfile = async (profileObj) => {
  const foundProfile = await findById(profileObj.id).then((profile) => profile);
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
  update,
  findOrCreateProfile,
};
