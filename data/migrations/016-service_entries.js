exports.up = (knex) => {
  return knex.schema.createTable('service_entries', (tbl) => {
    tbl
      .uuid('service_entry_id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid ()'));
    tbl
      .integer('service_type_id')
      .unsigned()
      .notNullable()
      .references('service_type_id')
      .inTable('service_types');
    tbl
      .integer('location_id')
      .unsigned()
      .notNullable()
      .references('location_id')
      .inTable('locations');
    tbl.date('service_date').notNullable();
    tbl.time('service_time').notNullable();
    tbl.jsonb('service_entry_data').notNullable();
    tbl.timestamps(true, true);
  });
};

// WHY doesn't this tbl have recipient or provider id?

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('service_entries');
};
