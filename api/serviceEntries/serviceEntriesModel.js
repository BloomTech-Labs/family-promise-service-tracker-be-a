const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('service_entries as se')
    .leftJoin('providers as pv', 'se.primary_provider_id', 'pv.provider_id')
    .leftJoin('recipients as r', 'se.primary_recipient_id', 'r.recipient_id')
    .leftJoin(
      'service_type_programs as stp',
      'se.service_type_program_id',
      'stp.service_type_program_id'
    )
    .leftJoin(
      'service_types as st',
      'st.service_type_id',
      'stp.service_type_id'
    )
    .leftJoin('programs as pg', 'pg.program_id', 'stp.program_id')
    .leftJoin('statuses as sta', 'sta.status_id', 'se.status_id')
    .leftJoin('locations as l', 'l.location_id', 'se.location_id')
    .select(
      knex.raw(
        'service_type_programs.*, to_json(programs.*) as program, 3, to_json(recipients.*) as recipients'
      )
    )
    .groupBy(
      'stp.service_type_program_id',
      'p.program_id',
      'st.service_type_id',
      'r.recipient_id'
    );
};
// const findAll = async () => {
//   return await knex('service_entries as se')
//     .join('providers as pv', 'se.primary_provider_id', 'pv.provider_id')
//     .join('recipients as r', 'se.primary_recipient_id', 'r.recipient_id')
//     .join(
//       'service_type_programs as stp',
//       'se.service_type_program_id',
//       'stp.service_type_program_id'
//     )
//     .join('service_types as st', 'st.service_type_id', 'stp.service_type_id')
//     .join('programs as pg', 'pg.program_id', 'stp.program_id')
//     .join('statuses as sta', 'sta.status_id', 'se.status_id')
//     .join('locations as l', 'l.location_id', 'se.location_id')
//     .select(
//       'service_entry_id',
//       'provider_first_name',
//       'provider_last_name',
//       'recipient_first_name',
//       'recipient_last_name',
//       'program_name',
//       'service_type_name',
//       'apply_service_to_household',
//       'service_date',
//       'service_time',
//       'service_duration',
//       'service_value',
//       'service_quantity',
//       'service_entry_notes',
//       'service_entry_data',
//       'service_unit_id',
//       'status',
//       'service_rating_id',
//       'l.location_id',
//       'address',
//       'se.created_at',
//       'se.updated_at'
//     );
// };

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
      'service_entry_id',
      'provider_first_name',
      'provider_last_name',
      'recipient_first_name',
      'recipient_last_name',
      'program_name',
      'service_type_name',
      'apply_service_to_household',
      'service_date',
      'service_time',
      'service_duration',
      'service_value',
      'service_quantity',
      'service_entry_notes',
      'service_entry_data',
      'service_unit_id',
      'status',
      'service_rating_id',
      'l.location_id',
      'address',
      'se.created_at',
      'se.updated_at'
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
