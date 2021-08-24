const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('email_addresses');
};

const findById = async (id) => {
  return await knex('email_addresses').where('email_address_id', id).first();
  // keeping these for now as a reference
  // .select(knex.raw('statuses.*, to_json(locations.*) as location'))
  // .groupBy('statuses.email_address_id', 'locations.location_id');
};

const createEmailAddress = async (newEmailAddress) => {
  return await knex('email_addresses').insert(newEmailAddress, ['*']);
};

const updateEmailAddress = async (id, emailAddress) => {
  return await knex('email_addresses')
    .where('email_address_id', id)
    .update(emailAddress);
};

const removeEmailAddress = async (id) => {
  return await knex('email_addresses').where('email_address_id', id).del();
};

module.exports = {
  findAll,
  findById,
  createEmailAddress,
  updateEmailAddress,
  removeEmailAddress,
};
