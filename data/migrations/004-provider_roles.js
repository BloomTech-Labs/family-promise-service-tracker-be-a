exports.up = (knex) => {
  return knex.schema.createTable('provider_roles', (tbl) => {
    tbl.increments('provider_role_id').primary();
    tbl.string('provider_role', 255).notNullable();
    tbl.text('provider_role_description');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('provider_roles');
};

// administrator, program manager, service provider, intern, volunteer, etc..
