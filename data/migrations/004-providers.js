exports.up = (knex) => {
  return knex.schema.createTable('providers', (tbl) => {
    tbl.string('provider_id').primary();
    // Does not autofill an id, we use the id that Okta generates
    tbl.string('role').notNullable();
    tbl.string('provider_first_name').notNullable();
    tbl.string('provider_last_name').notNullable();
    tbl.string('provider_email');
    tbl.string('provider_phone_number');
    tbl.string('employee_id').unique();
    tbl.text('provider_avatar_url');
    tbl.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('providers');
};

// All providers are considered to be direct associates with the main organization (ie, none will be 3rd party businesses or providers)
