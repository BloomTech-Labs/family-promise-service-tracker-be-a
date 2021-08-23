exports.up = (knex) => {
  return knex.schema.createTable('providers', (tbl) => {
    tbl.string('provider_id').primary();
    // Does not autofill an id, we use the id that Okta generates
    tbl
      .integer('provider_role_id', 128)
      .unsigned()
      .notNullable()
      .references('provider_role_id')
      .inTable('provider_roles')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
    tbl.string('employee_id', 255);
    tbl.string('provider_first_name', 255).notNullable();
    tbl.string('provider_last_name', 255).notNullable();
    tbl.string('provider_email', 255);
    tbl.string('provider_phone_number', 31);
    tbl.text('provider_avatar_url');
    tbl.boolean('provider_is_active').notNullable().defaultTo(true);
    tbl.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('providers');
};

// All providers are considered to be direct associates with the main organization (ie, none will be 3rd party businesses or providers)
