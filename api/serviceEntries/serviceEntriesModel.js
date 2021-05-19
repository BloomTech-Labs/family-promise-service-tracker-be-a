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

module.exports = {
  findAll,
};
