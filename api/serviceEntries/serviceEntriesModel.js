const knex = require('../../data/db-config');

const create = async (serviceEntries) => {
  let newServiceEntriesId;
  try {
    await knex.transaction(async (trx) => {
      const createdServiceEntries = await trx('service_entries')
        .insert([
          { service_type_id: serviceEntries.service_type_id },
          { location_id: serviceEntries.location_id },
          { service_time: serviceEntries.service_time },
          { service_date: serviceEntries.service_date },
          { service_entry_data: serviceEntries.service_entry },
        ])
        .returning('*');

      newServiceEntriesId = createdServiceEntries[0].service_entry_id;

      await trx('service_entry_providers').insert([
        { service_entry_id: newServiceEntriesId },
        { provider_id: serviceEntries.provider_id },
      ]);
      await trx('service_entry_recipients').insert([
        { service_entry_id: newServiceEntriesId },
        { recipient_id: serviceEntries.recipient_id },
      ]);
    });

    return await findById(newServiceEntriesId);
  } catch (err) {
    throw new Error(err);
  }
};

const findAll = async () => {
  return await knex('service_entries')
    .leftJoin('service_entry_recipients', {
      'service_entries.service_entry_id':
        'service_entry_recipients.service_entry_id',
    })
    .leftJoin('recipients', {
      'service_entry_recipients.recipient_id': 'recipients.recipient_id',
    })
    .leftJoin('service_types', {
      'service_entries.service_type_id': 'service_types.service_type_id',
    })
    .leftJoin('locations', {
      'service_entries.location_id': 'locations.location_id',
    })
    .select(
      knex.raw(
        'service_entries.*, to_json(recipients.*) as recipient, to_json(service_types.*) as service_type, to_json(locations.*) as location'
      )
    )
    .groupBy(
      'service_entries.service_entry_id',
      'recipients.recipient_id',
      'service_types.service_type_id',
      'locations.location_id'
    );
};

const findById = async (id) => {
  return await knex('service_entries')
    .where({ 'service_entries.service_entry_id': id })
    .leftJoin('service_entry_recipients', {
      'service_entries.service_entry_id':
        'service_entry_recipients.service_entry_id',
    })
    .leftJoin('recipients', {
      'service_entry_recipients.recipient_id': 'recipients.recipient_id',
    })
    .leftJoin('service_types', {
      'service_entries.service_type_id': 'service_types.service_type_id',
    })
    .leftJoin('locations', {
      'service_entries.location_id': 'locations.location_id',
    })
    .select(
      knex.raw(
        'service_entries.*, to_json(recipients.*) as recipient, to_json(service_types.*) as service_type, to_json(locations.*) as location'
      )
    )
    .first()
    .groupBy(
      'service_entries.service_entry_id',
      'recipients.recipient_id',
      'service_types.service_type_id',
      'locations.location_id'
    );
};

// Can only update service_entries data in table on front end
// Can't update "extra" data that's tacked onto the responses
// Can't edit: first_name, last_name, service_type_name, status_name
const update = (id, object) => {
  return knex('service_entries')
    .where({ id: id })
    .first()
    .update(object)
    .returning('*');
};

module.exports = {
  create,
  findAll,
  findById,
  update,
};
