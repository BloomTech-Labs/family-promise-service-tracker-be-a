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
    .select('p.program_name', 'l.location_longitude', 'l.location_latitude');
};

module.exports = {
  findAllServiceEntryLocations,
};
