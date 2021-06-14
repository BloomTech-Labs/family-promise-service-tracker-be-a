const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('service_entries')
    .leftJoin('service_entry_recipients', {
      'service_entries.service_entry_id':
        'service_entry_recipients.service_entry_id',
    })
    .rightJoin('service_types', {
      'service_entries.service_type_id': 'service_types.service_type_id',
    })
    // .rightJoin('statuses', {
    //   'service_entries.status_id': 'statuses.id',
    // }) commenting out because there is no more statuses table schema - Brian C. 06/14/21
    .select(
      knex.raw(
        'service_entries.*, to_json(service_entry_recipients.*) as service_entry_recipients, to_json(service_types.*) as service_types'
      )
    )
    .groupBy(
      'service_entries.service_entry_id',
      'service_entry_recipieints.service_entry_id',
      'service_types.service_type_id'
    );
};

const findById = async (id) => {
  return await knex('service_entries')
    .where({ 'service_entries.service_entry_id': id })
    .leftJoin('service_entry_recipients', {
      'service_entries.service_entry_id':
        'service_entry_recipients.service_entry_id',
    })
    .rightJoin('service_types', {
      'service_entries.service_type_id': 'service_types.service_type_id',
    })
    // .rightJoin('statuses', {
    //   'service_entries.status_id': 'statuses.id',
    // }) commenting out because not in schema anymore - Brian C 06/14/21
    .select(
      knex.raw(
        'service_entries.*, to_json(service_entry_recipients.*) as service_entry_recipients, to_json(service_types.*) as service_type'
      )
    )
    .first()
    .groupBy(
      'service_entries.service_entry_id',
      'service_entry_recipients.service_entry_id',
      'service_types.service_type_id'
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
