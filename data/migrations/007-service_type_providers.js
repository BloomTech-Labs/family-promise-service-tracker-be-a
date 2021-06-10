exports.up = function (knex) {
  return knex.schema.createTable('service_type_providers', (tbl) => {
    tbl.increments('service_type_provider_id');
    tbl
      .integer('service_type_id')
      .unsigned()
      .notNullable()
      .references('service_type_id')
      .inTable('service_types')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    tbl
      .uuid('provider_id')
      .unsigned()
      .notNullable()
      .references('provider_id')
      .inTable('providers')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('service_type_providers');
};
