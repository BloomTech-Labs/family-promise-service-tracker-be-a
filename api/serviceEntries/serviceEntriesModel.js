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
        'service_entries.*, recipients.first_name, recipients.last_name, service_types.name as service_type_name, statuses.name as status_name'
      )
    )
    .groupBy(
      'service_entries.id',
      'recipients.id',
      'service_types.id',
      'statuses.id'
    );
};

// need to return the single newly created service_entry **only
const create = async () => {
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
        'service_entries.*, recipients.first_name, recipients.last_name, service_types.name as service_type_name, statuses.name as status_name'
      )
    )
    .groupBy(
      'service_entries.id',
      'recipients.id',
      'service_types.id',
      'statuses.id'
    );
};

module.exports = {
  findAll,
  findById,
  create,
};
