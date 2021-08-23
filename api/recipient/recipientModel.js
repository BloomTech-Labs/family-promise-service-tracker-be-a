const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('recipients as r')
    .join('genders as g', 'g.gender_id', 'r.gender_id')
    .join('races as ra', 'ra.race_id', 'r.race_id')
    .join('ethnicities as e', 'e.ethnicity_id', 'r.ethnicity_id')
    .select('*');
};

const findById = async (id) => {
  return await knex('recipients as r')
    .join('genders as g', 'g.gender_id', 'r.gender_id')
    .join('races as ra', 'ra.race_id', 'r.race_id')
    .join('ethnicities as e', 'e.ethnicity_id', 'r.ethnicity_id')
    .select('*')
    .where('recipient_id', id)
    .first();
};

const createRecipient = async (newRecipient) => {
  return await knex('recipients').insert(newRecipient, ['*']);
};

const updateRecipient = async (id, updatedInfo) => {
  return await knex('recipients')
    .where('recipient_id', id)
    .insert(updatedInfo, ['*']);
};

// Note: DANGEROUS: instead of deleting ANYTHING, we are generally using is_active to mark a record as inactive
const deleteRecipient = (id) => {
  return knex('recipients').where('recipient_id', id).del();
};

module.exports = {
  findAll,
  findById,
  createRecipient,
  updateRecipient,
  deleteRecipient,
};
