exports.up = (knex) => {
  return knex.schema.createTable('service_entries', (tbl) => {
    tbl
      .uuid('service_entry_id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid ()'));
    tbl
      .string('primary_provider_id')
      .unsigned()
      .notNullable()
      .references('provider_id')
      .inTable('providers')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
    tbl
      .uuid('primary_recipient_id')
      .unsigned()
      .notNullable()
      .references('recipient_id')
      .inTable('recipients')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
    tbl
      .integer('service_type_program_id')
      .unsigned()
      .notNullable()
      .references('service_type_program_id')
      .inTable('service_type_programs')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
    tbl.boolean('apply_service_to_household').notNullable().defaultTo(false);
    tbl.date('service_date').notNullable();
    tbl.time('service_time');
    tbl.time('service_duration');
    tbl.decimal('service_value');
    tbl.integer('service_quantity');
    tbl.text('service_entry_notes');
    tbl.jsonb('service_entry_data').notNullable();
    tbl
      .integer('service_unit_id')
      .unsigned()
      .references('service_unit_id')
      .inTable('service_units')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
    tbl
      .integer('status_id')
      .defaultTo(2)
      .unsigned()
      .notNullable()
      .references('status_id')
      .inTable('statuses')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
    tbl
      .integer('service_rating_id')
      .unsigned()
      .references('service_rating_id')
      .inTable('service_ratings')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
    tbl
      .uuid('location_id')
      .unsigned()
      .notNullable()
      .references('location_id')
      .inTable('locations')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
    tbl.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('service_entries');
};

// The actual service event.
// The service_entry_data is for future customization possibilities. (can use to put case workers/other supporting providers, as well as occupants of the household affected by the provided service)
// recipient and provider id were updated to 'primary' to simplify the table joinings, not to limit either for associations. Be careful and adust database appropriately on update.
// apply_service_to_household is intended to be a button that allows the provider to automatically get all the occupants of a household and add the to the service_entry data, so that it is queryable, and all the proper recipients are associated with the logged service
