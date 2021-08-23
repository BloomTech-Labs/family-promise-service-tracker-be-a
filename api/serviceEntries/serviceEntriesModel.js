const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('service_entries');
};

const findById = async (id) => {
  return await knex('service_entries').where('service_entry_id', id).first();
};

const createServiceEntry = async (newServiceEntry) => {
  return await knex('service_entries').insert(newServiceEntry, ['*']);
};

// Can only update service_entries data in table on front end
// Can't update "extra" data that's tacked onto the responses
// Can't edit: first_name, last_name, service_type_name, status_name _
const update = (id, object) => {
  return knex('service_entries')
    .where('service_entry_id', id)
    .update(object)
    .then(() => {
      return findById(id);
    });
};

const deleteRecord = (id) => {
  return knex('service_entries').where('service_entry_id', id).del();
};

module.exports = {
  createServiceEntry,
  findAll,
  findById,
  update,
  deleteRecord,
};
