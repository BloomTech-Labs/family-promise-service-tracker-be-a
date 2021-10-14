const knex = require('../../data/db-config');

const findAllServiceEntryLocations = async () => {
  return await knex('service_entries as se')
    .join(
      'service_type_programs as stp',
      'stp.service_type_program_id',
      'se.service_type_program_id'
    )
    .join('programs as p', 'stp.program_id', 'p.program_id')
    .join('locations as l', 'se.location_id', 'l.location_id')
    .join('recipients as r', 'se.primary_recipient_id', 'r.recipient_id')
    .join('providers as pd', 'se.primary_provider_id', 'pd.provider_id')
    .join('service_types as st', 'stp.service_type_id', 'st.service_type_id')
    .leftJoin('service_units as su', 'se.service_unit_id', 'su.service_unit_id')
    .select(
      'p.program_name',
      'se.service_date',
      'se.service_time',
      'se.service_duration',
      'se.service_value',
      'se.service_quantity',
      'su.service_unit_name',
      'se.service_entry_notes',
      'se.service_entry_data',
      'st.service_type_name',
      'st.service_type_description',
      'r.recipient_first_name',
      'r.recipient_last_name',
      'pd.provider_first_name',
      'pd.provider_last_name',
      'l.address',
      'l.address_line2',
      'l.city',
      'l.state',
      'l.zip',
      'l.location_longitude',
      'l.location_latitude'
    );
};

module.exports = {
  findAllServiceEntryLocations,
};
