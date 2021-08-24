const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('service_types');
};

const findById = async (id) => {
  return await knex('service_types').where('service_type_id', id).first();
};

const createServiceType = async (newServiceType) => {
  return await knex('service_types').insert(newServiceType, ['*']);
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
