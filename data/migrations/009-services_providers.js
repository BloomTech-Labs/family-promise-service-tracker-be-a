exports.up = function (knex) {
  return knex.schema.createTable('services_providers', (tbl) => {
    tbl.increments('id').primary();
    tbl
      .integer('service_type_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('service_types')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .string('provider_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('services_providers');
};
