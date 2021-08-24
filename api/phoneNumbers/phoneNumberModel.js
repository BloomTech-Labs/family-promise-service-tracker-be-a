const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('phone_numbers');
};

const findById = async (id) => {
  return await knex('phone_numbers').where('phone_number_id', id).first();
  // keeping these for now as a reference
  // .select(knex.raw('statuses.*, to_json(locations.*) as location'))
  // .groupBy('statuses.phone_number_id', 'locations.location_id');
};

const createPhoneNumber = async (newPhoneNumber) => {
  return await knex('phone_numbers').insert(newPhoneNumber, ['*']);
};

const updatePhoneNumber = async (id, phoneNumber) => {
  return await knex('phone_numbers')
    .where('phone_number_id', id)
    .update(phoneNumber);
};

const removePhoneNumber = async (id) => {
  return await knex('phone_numbers').where('phone_number_id', id).del();
};

module.exports = {
  findAll,
  findById,
  createPhoneNumber,
  updatePhoneNumber,
  removePhoneNumber,
};
