const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('service_types')
    .leftJoin('service_type_providers', {
      'service_types.service_type_id': 'service_type_providers.service_type_id',
    })
    .leftJoin('providers', {
      'service_type_providers.provider_id': 'providers.provider_id',
    })
    .select(
      knex.raw('service_types.*, json_agg(providers.*) as service_providers')
    )
    .groupBy('service_types.service_type_id');
};

const findById = async (id) => {
  return await knex('service_types')
    .leftJoin('service_type_providers', {
      'service_types.service_type_id': 'service_type_providers.service_type_id',
    })
    .leftJoin('providers', {
      'service_type_providers.provider_id': 'providers.provider_id',
    })
    .select(
      knex.raw('service_types.*, json_agg(providers.*) as service_providers')
    )
    .where({ 'service_types.service_type_id': id })
    .groupBy('service_types.service_type_id')
    .first();
};

const findByType = async (type) => {
  return await knex('service_types');
};

const create = async (serviceType) => {
  // separate out the service_providers array for junction table insert
  const { service_providers, ...newServiceType } = serviceType;
  // declare id variable for access across scopes
  let newServiceTypeId;
  try {
    await knex.transaction(async (trx) => {
      // first insert the serviceType object into service_types
      const createdServiceType = await trx('service_types')
        .insert(newServiceType)
        .returning('*');

      // set the ID of the returning DB record
      newServiceTypeId = createdServiceType[0].service_type_id;

      // if there are service providers that need to be associated
      // with this type, insert them into junction table
      if (service_providers && service_providers.length > 0) {
        await trx('service_type_providers').insert(
          service_providers.map((p) => {
            return {
              service_type_id: newServiceTypeId,
              provider_id: p.provider_id,
            };
          })
        );
      }
    });
    // return promise with the new service type and associated providers
    return await findById(newServiceTypeId);
  } catch (err) {
    // if transaction fails, forward the error to the router for handling
    throw new Error(err);
  }
};

const update = async (id, updates) => {
  // separate out the service_providers array for junction table insert
  const { service_providers, ...serviceType } = updates;

  try {
    await knex.transaction(async (trx) => {
      // only make updates to service_types table if request includes updates
      if (Object.keys(serviceType).length > 0) {
        await trx('service_types').where({ id }).first().update(serviceType);
      }

      // if request includes providers_array, wipe existing associations
      if (service_providers) {
        await trx('service_type_providers')
          .where('service_type_id', id)
          .delete();
      }
      // then insert new associations if there are any
      if (service_providers && service_providers.length > 0) {
        await trx('service_type_providers').insert(
          service_providers.map((p) => {
            return { service_type_id: id, provider_id: p.provider_id };
          })
        );
      }
    });
    // return promise with the updated service type and associated providers
    return await findById(id);
  } catch (err) {
    // if transaction fails, forward the error to the router for handling
    throw new Error(err);
  }
};

module.exports = {
  knex,
  findAll,
  findById,
  create,
  update,
  findByType,
};
