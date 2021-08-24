const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('statuses');
};

const findById = async (id) => {
  return await knex('statuses').where('status_id', id).first();
  // keeping these for now as a reference
  // .select(knex.raw('statuses.*, to_json(locations.*) as location'))
  // .groupBy('statuses.status_id', 'locations.location_id');
};

const createStatus = async (newStatus) => {
  return await knex('statuses').insert(newStatus, ['*']);
};

const updateStatus = async (id, Status) => {
  return await knex('statuses').where('status_id', id).update(Status);
};

const removeStatus = async (id) => {
  return await knex('statuses').where('status_id', id).del();
};

module.exports = {
  findAll,
  findById,
  createStatus,
  updateStatus,
  removeStatus,
};
