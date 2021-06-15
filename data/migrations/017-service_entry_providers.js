exports.up = (knex) => {
  return knex.schema.createTable('service_entry_providers', function (tbl) {
    tbl.increments('service_entry_provider_id');
    tbl
      .uuid('service_entry_id')
      .notNullable()
      .unsigned()
      .references('service_entry_id')
      .inTable('service_entries')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
    tbl
      .string('provider_id')
      .notNullable()
      .unsigned()
      .references('provider_id')
      .inTable('providers')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
    tbl.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('service_entry_providers');
};
