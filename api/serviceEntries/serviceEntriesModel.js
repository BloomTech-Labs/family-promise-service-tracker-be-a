const knex = require('../../data/db-config');

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
  findAll,
  findById,
  update,
};
