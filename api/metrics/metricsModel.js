const knex = require('../../data/db-config');

const findAllUniqueRecipients = async () => {
  return knex('recipients').count('id');
};

const findAllUniqueServices = async () => {
  return knex('service_entries').count('id');
};

const newRecipientsLastWeek = async () => {
  return knex('recipients')
    .count('id')
    .where('created_at', '>', '2021-05-17T00:00:00Z');
};

const newServicesLastWeek = async () => {
  return knex('service_entries')
    .count('id')
    .where('created_at', '>', '2021-05-17T00:00:00Z');
};

module.exports = {
  findAllUniqueRecipients,
  findAllUniqueServices,
  newRecipientsLastWeek,
  newServicesLastWeek,
};
