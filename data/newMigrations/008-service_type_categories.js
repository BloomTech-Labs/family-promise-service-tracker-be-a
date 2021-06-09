exports.up = function (knex) {
  return knex.schema.createTable('service_types_categories', (tbl) => {
    tbl.increments('service_type_category_id').primary();
    tbl.foreign('service_category_id').references('service_categories.service_category_id');
    tbl.foreign('service_type_id').references('service_types.service_type_id');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('service_types_categories');
};
