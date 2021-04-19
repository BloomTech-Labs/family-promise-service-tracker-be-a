exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('services_providers').del();
  await knex('service_entries').del();
  await knex('service_types').del();
  await knex('statuses').del();
  await knex('programs_users').del();
  await knex('programs').del();
  await knex('profiles').del();
};
