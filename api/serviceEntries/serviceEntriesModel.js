const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('service_entries as se')
    .join('providers as pv', 'se.primary_provider_id', 'pv.provider_id')
    .join('recipients as r', 'se.primary_recipient_id', 'r.recipient_id')
    .join(
      'service_type_programs as stp',
      'se.service_type_program_id',
      'stp.service_type_program_id'
    )
    .join('service_types as st', 'st.service_type_id', 'stp.service_type_id')
    .join('programs as pg', 'pg.program_id', 'stp.program_id')
    .join('statuses as sta', 'sta.status_id', 'se.status_id')
    .join('locations as l', 'l.location_id', 'se.location_id')
    .select(
      knex.raw(
        'se.*,  to_json(r.*) as recipient, to_json(st.*) as service_type, to_json(l.*) as location, to_json(pv.*) as provider, to_json(pg.*) as program, to_json(sta.*) as status'
      )
    )
    .groupBy(
      'se.service_entry_id',
      'r.recipient_id',
      'st.service_type_id',
      'l.location_id',
      'pv.provider_id',
      'pg.program_id',
      'sta.status_id'
    );
};

const findById = async (id) => {
  return await knex('service_entries as se')
    .join('providers as pv', 'se.primary_provider_id', 'pv.provider_id')
    .join('recipients as r', 'se.primary_recipient_id', 'r.recipient_id')
    .join(
      'service_type_programs as stp',
      'se.service_type_program_id',
      'stp.service_type_program_id'
    )
    .join('service_types as st', 'st.service_type_id', 'stp.service_type_id')
    .join('programs as pg', 'pg.program_id', 'stp.program_id')
    .join('statuses as sta', 'sta.status_id', 'se.status_id')
    .join('locations as l', 'l.location_id', 'se.location_id')
    .select(
      knex.raw(
        'se.*,  to_json(r.*) as recipient, to_json(st.*) as service_type, to_json(l.*) as location, to_json(pv.*) as provider, to_json(pg.*) as program, to_json(sta.*) as status'
      )
    )
    .groupBy(
      'se.service_entry_id',
      'r.recipient_id',
      'st.service_type_id',
      'l.location_id',
      'pv.provider_id',
      'pg.program_id',
      'sta.status_id'
    )
    .where('service_entry_id', id)
    .first();
};

const createServiceEntry = async (newServiceEntry) => {
  return await knex('service_entries').insert(newServiceEntry, ['*']);
};

// Can only update service_entries data in table on front end
// Can't update "extra" data that's tacked onto the responses
// Can't edit: first_name, last_name, service_type_name, status_name _
const update = (id, object) => {
  return knex('service_entries')
    .where('service_entry_id', id)
    .update(object)
    .then(() => {
      return findById(id);
    });
};

const deleteRecord = (id) => {
  return knex('service_entries').where('service_entry_id', id).del();
};

module.exports = {
  createServiceEntry,
  findAll,
  findById,
  update,
  deleteRecord,
};
