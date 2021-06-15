exports.up = function (knex) {
  return knex.schema.createTable('service_type_categories', (tbl) => {
    tbl.increments('service_type_category_id').primary();
    tbl
      .integer('service_category_id', 128)
      .unsigned()
      .notNullable()
      .references('service_category_id')
      .inTable('service_categories')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
    tbl
      .integer('service_type_id', 128)
      .unsigned()
      .notNullable()
      .references('service_type_id')
      .inTable('service_types')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('service_type_categories');
};
