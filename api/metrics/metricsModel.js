const knex = require('../../data/db-config');

const findAllUniqueRecipients = () => {
  return knex('recipients').count('id');
};

const findAllUniqueServices = () => {
  return knex('service_entries').count('id');
};

const newRecipientsLastWeek = () => {
  return knex('recipients')
    .count('id')
    .where('created_at', '>', '2021-05-17T00:00:00Z');
};

const newServicesLastWeek = () => {
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
