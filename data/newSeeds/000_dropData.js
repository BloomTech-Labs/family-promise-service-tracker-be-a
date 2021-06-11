exports.seed = async function (knex) {
    // Truncate instead of delete all tables to wipe PKs
    await knex.raw(
      'ALTER SEQUENCE service_entry_recipients_id_seq RESTART WITH 1; TRUNCATE service_entry_recipients CASCADE'
    );
    await knex.raw(
      'ALTER SEQUENCE service_entry_providers_id_seq RESTART WITH 1; TRUNCATE service_entry_providers CASCADE'
    );
    await knex.raw(
      'ALTER SEQUENCE service_entries_id_seq RESTART WITH 1; TRUNCATE service_entries CASCADE'
    );
    await knex.raw(
      'ALTER SEQUENCE phone_numbers_id_seq RESTART WITH 1; TRUNCATE phone_numbers CASCADE'
    );
    await knex.raw(
      'ALTER SEQUENCE email_addresses_id_seq RESTART WITH 1; TRUNCATE email_addresses CASCADE'
    );
    await knex.raw(
      'ALTER SEQUENCE recipients_id_seq RESTART WITH 1; TRUNCATE recipients CASCADE'
    );
    await knex.raw(
      'ALTER SEQUENCE ethnicities_id_seq RESTART WITH 1; TRUNCATE ethnicities CASCADE'
    );
    await knex.raw(
      'ALTER SEQUENCE races_id_seq RESTART WITH 1; TRUNCATE races CASCADE'
    );
    await knex.raw(
      'ALTER SEQUENCE genders_id_seq RESTART WITH 1; TRUNCATE genders CASCADE'
    );
    await knex.raw(
      'ALTER SEQUENCE households_id_seq RESTART WITH 1; TRUNCATE households CASCADE'
    );
    await knex.raw(
      'ALTER SEQUENCE service_type_categories_id_seq RESTART WITH 1; TRUNCATE service_type_categories CASCADE'
    );
    await knex.raw(
      'ALTER SEQUENCE service_type_providers_id_seq RESTART WITH 1; TRUNCATE service_type_providers CASCADE'
    );
    await knex.raw(
      'ALTER SEQUENCE service_types_id_seq RESTART WITH 1; TRUNCATE service_types CASCADE'
    );
    await knex.raw(
      'ALTER SEQUENCE program_providers_id_seq RESTART WITH 1; TRUNCATE program_providers CASCADE'
    );
    await knex.raw(
      'ALTER SEQUENCE locations_id_seq RESTART WITH 1; TRUNCATE locations CASCADE'
    );
    await knex.raw(
      'ALTER SEQUENCE service_categories_id_seq RESTART WITH 1; TRUNCATE service_categories CASCADE'
    );
    await knex.raw(
      'ALTER SEQUENCE providers_id_seq RESTART WITH 1; TRUNCATE providers CASCADE'
    );
    await knex.raw(
      'ALTER SEQUENCE programs_id_seq RESTART WITH 1; TRUNCATE programs CASCADE'
    );
};
