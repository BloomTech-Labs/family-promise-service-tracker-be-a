exports.up = function (knex) {
  return knex.schema.createTable('service_entry_recipients', (tbl) => {
    tbl.increments('service_entry_provider_id').primary();
    tbl
      .uuid('service_entry_id')
      .notNullable()
      .unsigned()
      .references('service_entry_id')
      .inTable('service_entries')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    tbl
      .uuid('provider_id')
      .notNullable()
      .unsigned()
      .references('provider_id')
      .inTable('providers')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('service_entry_recipients');
};
