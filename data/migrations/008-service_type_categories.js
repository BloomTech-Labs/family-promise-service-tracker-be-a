exports.up = function (knex) {
  return knex.schema.createTable('service_types_categories', (tbl) => {
    tbl.increments('service_type_category_id').primary();
    tbl.integer('service_category_id', 128)
      .unsigned()
      .notNullable()
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT')
      .references('service_categories.service_category_id');
    tbl.integer('service_type_id', 128)
      .unsigned()
      .notNullable()
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT')
      .references('service_types.service_type_id');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('service_types_categories');
};
