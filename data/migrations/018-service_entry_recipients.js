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
      .onDelete('CASCADE');
    tbl
      .uuid('recipient_id')
      .notNullable()
      .unsigned()
      .references('recipient_id')
      .inTable('recipients')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('service_entry_recipients');
};
