exports.seed = async function (knex) {
  // Truncate instead of delete all tables to wipe PKs
  await knex.raw(
    'ALTER SEQUENCE services_providers_id_seq RESTART WITH 1; TRUNCATE services_providers CASCADE'
  );
  await knex.raw(
    'ALTER SEQUENCE service_entries_id_seq RESTART WITH 1; TRUNCATE service_entries CASCADE'
  );
  await knex.raw(
    'ALTER SEQUENCE service_types_id_seq RESTART WITH 1; TRUNCATE service_types CASCADE'
  );
  await knex.raw(
    'ALTER SEQUENCE statuses_id_seq RESTART WITH 1; TRUNCATE statuses CASCADE'
  );
  await knex.raw(
    'ALTER SEQUENCE programs_users_id_seq RESTART WITH 1; TRUNCATE programs_users CASCADE'
  );
  await knex.raw(
    'ALTER SEQUENCE programs_id_seq RESTART WITH 1; TRUNCATE programs CASCADE'
  );
  await knex.raw('TRUNCATE profiles CASCADE');
};
