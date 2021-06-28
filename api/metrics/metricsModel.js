const knex = require('../../data/db-config');

const findAllUniqueRecipients = () => {
  return knex('recipients').count('recipient_id');
};

const findAllUniqueServices = () => {
  return knex('service_entries').count('service_entry_id');
};

const newRecipientsLastWeek = () => {
  return knex('recipients')
    .count('recipient_id')
    .where('created_at', '>', '2021-05-30T00:00:00Z'); // Hardcoded date, fix
};

const newServicesLastWeek = () => {
  return knex('service_entries')
    .count('service_entry_id')
    .where('created_at', '>', '2021-05-30T00:00:00Z'); // Hardcoded date, fix
};

module.exports = {
  findAllUniqueRecipients,
  findAllUniqueServices,
  newRecipientsLastWeek,
  newServicesLastWeek,
};
