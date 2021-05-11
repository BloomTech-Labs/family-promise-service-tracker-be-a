exports.up = function (knex) {
  return knex.schema.createTable('service_entries', (tbl) => {
    tbl.increments('id').primary();
    tbl
      .integer('service_type_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('service_types');
    tbl.datetime('provided_at').notNullable();
    tbl.text('notes');
    tbl.integer('quantity');
    tbl
      .integer('recipient_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('recipients')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('status_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('statuses');
    tbl
      .string('provider_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('profiles');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('service_entries');
};
