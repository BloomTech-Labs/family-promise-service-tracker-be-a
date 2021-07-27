const knex = require('../../data/db-config');
const { okta } = require('../../config/okta');

const findAll = async () => {
  return await knex('providers')
    .leftJoin('program_providers', {
      'providers.provider_id': 'program_providers.provider_id',
    })
    .leftJoin('programs', {
      'program_providers.program_id': 'programs.program_id',
    })
    .select(knex.raw('providers.*, json_agg(programs.*) as programs'))
    .groupBy('providers.provider_id');
};

const findById = async (id) => {
  return await knex('providers')
    .leftJoin('program_providers', {
      'providers.provider_id': 'program_providers.provider_id',
    })
    .leftJoin('programs', {
      'program_providers.program_id': 'programs.program_id',
    })
    .select(knex.raw('providers.*, json_agg(programs.*) as programs'))
    .where({ 'providers.provider_id': id })
    .groupBy('providers.provider_id')
    .first();
};

const findServiceProviders = () => {
  return knex('providers')
    .select('provider_id', 'provider_first_name', 'provider_last_name')
    .where('role', 'service_provider');
};

const addProvider = async (provider) => {
  const programProviderEntries = [];
  // look up the objection framework to make this an atomic transaction
  // const trx = await knex.startTransaction();
  const ins = await knex('providers').insert({
    provider_first_name: provider.provider_first_name,
    provider_last_name: provider.provider_last_name,
    role: provider.role,
    // needs an Okta ID to be provided HERE, or we can sub in a uuid in the meantime
  });
  provider.programs.forEach(async (program_name) => {
    await knex('programs')
      .select('program_id', 'program_name')
      .where('program_name', program_name)
      .then(function (pN) {
        programProviderEntries.push(pN['0']);
      });
  });
  return findServiceProviders();
};

const update = async (id, updates) => {
  const { programs, ...provider } = updates;

  try {
    // set up a postgres transaction to make sure
    // we're not making partial updates
    await knex.transaction(async (trx) => {
      // only make updates to provider table if there are any
      if (Object.keys(provider).length > 0) {
        await knex('providers')
          .where({ id })
          .first()
          .update(provider)
          .transacting(trx);
      }

      // if request includes a programs array,
      // first wipe existing associations
      if (programs) {
        await knex('program_providers')
          .where('provider_id', id)
          .delete()
          .transacting(trx);
      }
      // then insert new associations if there are any
      if (programs && programs.length > 0) {
        await knex('program_providers')
          .insert(
            programs.map((p) => {
              return {
                program_id: p,
                provider_id: id,
              };
            })
          )
          .transacting(trx);
      }
      // if updating name fields, push changes to okta as well
      // errors returned here will cancel postgres transaction
      if (provider.provider_first_name || provider.provider_last_name) {
        let user = await okta.getUser(id);
        provider.provider_first_name
          ? (user.provider.firstName = provider.provider_first_name)
          : '';
        provider.provider_last_name
          ? (user.provider.lastName = provider.provider_last_name)
          : '';
        await user.update();
      }
    });
    // if transaction hasn't failed at any point,
    // return promise with updated profile object
    return await findById(id);
  } catch (err) {
    // if transaction fails, forward the error
    // to the router to be resolved
    throw new Error(err);
  }
};

module.exports = {
  findAll,
  findById,
  addProvider,
  update,
  findServiceProviders,
};
