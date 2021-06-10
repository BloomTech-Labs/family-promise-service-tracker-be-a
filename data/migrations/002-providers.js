exports.up = (knex) => {
  return knex.schema.createTable('providers', (tbl) => {
    tbl.uuid('provider_id').primary().defaultTo(knex.raw('gen_random_uuid ()'));
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
