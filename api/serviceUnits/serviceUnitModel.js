const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('service_units');
};

const findById = async (id) => {
  return await knex('service_units').where('service_unit_id', id).first();
  // keeping these for now as a reference
  // .select(knex.raw('service_units.*, to_json(locations.*) as location'))
  // .groupBy('service_units.service_unit_id', 'locations.location_id');
};

const createServiceUnit = async (newServiceUnit) => {
  return await knex('service_units').insert(newServiceUnit, ['*']);
};

const updateServiceUnit = async (id, serviceUnit) => {
  return await knex('service_units')
    .where('service_unit_id', id)
    .update(serviceUnit);
};

const removeServiceUnit = async (id) => {
  return await knex('service_units').where('service_unit_id', id).del();
};

module.exports = {
  findAll,
  findById,
  createServiceUnit,
  updateServiceUnit,
  removeServiceUnit,
};
