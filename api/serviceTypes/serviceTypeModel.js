const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('service_types');
};

const findById = async (id) => {
  return await knex('service_types').where('service_type_id', id).first();
};

const createServiceType = async (newServiceType) => {
  const newServiceTypeInsert = {
    service_type_name: newServiceType.service_type_name,
    service_type_description: newServiceType.service_type_description,
    service_type_entry_model: newServiceType.service_type_entry_model,
  };

  const service_response = await knex('service_types').insert(
    newServiceTypeInsert,
    ['*']
  );
  const service_type_id = service_response[0].service_type_id;

  const serviceTypeProgramData = await Promise.all(
    newServiceType.program_id.map(async (id) => {
      const programs = await knex('service_type_programs').insert(
        {
          program_id: id,
          service_type_id: service_type_id,
        },
        '*'
      );
      return programs[0];
    })
  );

  return {
    service_type: service_response[0],
    service_type_programs: serviceTypeProgramData,
  };
};

const updateServiceType = async (id, updates) => {
  await knex('service_types').where('service_type_id', id).update(updates);
  return findById(id);
};

// things are not usually deleted, but marked as inactive
const removeServiceType = async (id) => {
  await knex('service_types')
    .where('service_type_id', id)
    .update({ service_type_is_active: false });
  return findById(id);
  // sets active flag to false instead of delete keeping next line for ref
  // return await knex('service_types').where('service_type_id', id).del();
};

module.exports = {
  findAll,
  findById,
  createServiceType,
  updateServiceType,
  removeServiceType,
};
