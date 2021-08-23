const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('recipients');
};

const findById = async (id) => {
  return await knex('recipients').where('recipient_id', id).first();
};

const createRecipient = async (newRecipient) => {
  return await knex('recipients').insert(newRecipient, ['*']);
};

const updateRecipient = async (id, recipient) => {
  return await knex('recipients').where('recipient_id', id).update(recipient);
};

// Note: DANGEROUS: instead of deleting ANYTHING, we are generally using is_active to mark a record as inactive
const deleteRecipient = async (id) => {
  return await knex('recipients').where('recipient_id', id).del();
};

module.exports = {
  findAll,
  findById,
  createRecipient,
  updateRecipient,
  deleteRecipient,
};
