const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('service_type_programs as stp')
    .leftJoin('programs as p', 'p.program_id', 'stp.program_id')
    .leftJoin(
      'service_types as st',
      'st.service_type_id',
      'stp.service_type_id'
    )
    .select(
      'service_type_program_id',
      'stp.program_id',
      'stp.service_type_id',
      'program_name',
      'service_type_name',
      'service_type_entry_model'
    )
    .groupBy(
      'stp.service_type_program_id',
      'p.program_id',
      'st.service_type_id'
    )
    .orderBy([{ column: 'program_id' }, { column: 'service_type_name' }]);
};

const findById = async (id) => {
  return await knex('service_type_programs as stp')
    .where('service_type_program_id', id)
    .leftJoin('programs as p', 'p.program_id', 'stp.program_id')
    .leftJoin(
      'service_types as st',
      'st.service_type_id',
      'stp.service_type_id'
    )
    .select(
      knex.raw(
        'service_type_programs.*, to_json(programs.*) as program, to_json(service_types.*) as service_type'
      )
    )
    .first()
    .groupBy(
      'stp.service_type_program_id',
      'p.program_id',
      'st.service_type_id'
    );
};

// this will may be involved in a more complex machine, for when new service_types are created, and they need to be linked to a program(s)
const createServiceTypeProgram = async (newServiceEntry) => {
  return await knex('service_type_programs').insert(newServiceEntry, ['*']);
};

const updateServiceTypeProgram = (id, object) => {
  return knex('service_type_programs')
    .where({ service_type_program_id: id })
    .update(object);
};

const removeServiceTypeProgram = (id) => {
  return knex('service_type_programs')
    .where('service_type_program_id', id)
    .del();
};

module.exports = {
  findAll,
  findById,
  createServiceTypeProgram,
  updateServiceTypeProgram,
  removeServiceTypeProgram,
};
