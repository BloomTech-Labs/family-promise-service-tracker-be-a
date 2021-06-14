const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('service_entries')
    .leftJoin('recipients', {
      'service_entries.recipient_id': 'recipients.id',
    })
    .rightJoin('service_types', {
      'service_entries.service_type_id': 'service_types.id',
    })
    .rightJoin('statuses', {
      'service_entries.status_id': 'statuses.id',
    })
    .select(
      knex.raw(
        'service_entries.*, to_json(recipients.*) as recipient, to_json(service_types.*) as service_type, to_json(statuses.*) as status'
      )
    )
    .groupBy(
      'service_entries.id',
      'recipients.id',
      'service_types.id',
      'statuses.id'
    );
};

const findById = async (id) => {
  return await knex('service_entries')
    .where({ 'service_entries.id': id })
    .leftJoin('recipients', {
      'service_entries.recipient_id': 'recipients.id',
    })
    .rightJoin('service_types', {
      'service_entries.service_type_id': 'service_types.id',
    })
    .rightJoin('statuses', {
      'service_entries.status_id': 'statuses.id',
    })
    .select(
      knex.raw(
        'service_entries.*, to_json(recipients.*) as recipient, to_json(service_types.*) as service_type, to_json(statuses.*) as status'
      )
    )
    .first()
    .groupBy(
      'service_entries.id',
      'recipients.id',
      'service_types.id',
      'statuses.id'
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
