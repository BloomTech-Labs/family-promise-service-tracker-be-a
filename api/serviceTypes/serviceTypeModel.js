const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('service_types');
};

const findById = async (id) => {
  return await knex('service_types').where('service_type_id', id).first();
};

// const createServiceType = async (newServiceType) => {
//   return await knex('service_types').insert(newServiceType, ['*']);
//   // TO-DO: need to insert associations with programs in junction table
// };

// the argument is req.body
// req.body includes new service_type_name
// req.body also inclues program_ids: [1, 2]
const createServiceType = async (newServiceTypeData) => {
  const newServiceTypeModel = {
    service_type_name: newServiceTypeData.service_type_name,
    service_type_description: newServiceTypeData.service_type_description,
    service_type_entry_model: newServiceTypeData.service_type_entry_model,
  };

  const service_response = await knex('service_types').insert(
    newServiceTypeModel,
    ['*']
  );
  const service_type_id = service_response[0].service_type_id;

  const serviceTypeProgramData = await Promise.all(
    newServiceTypeData.program_id.map(async (id) => {
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
  // TO-DO: need to insert associations with programs in junction table
};

const updateServiceType = async (id, updates) => {
  return await knex('service_types')
    .where('service_type_id', id)
    .update(updates);
};

// things are not usually deleted, but marked as inactive
const removeServiceType = async (id) => {
  return await knex('service_types').where('service_type_id', id).del();
  //  TO-DO:  also need to remove associations in junction table
};

module.exports = {
  knex, //why?
  findAll,
  findById,
  createServiceType,
  updateServiceType,
  removeServiceType,
};
