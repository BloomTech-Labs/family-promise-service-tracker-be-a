exports.up = function (knex) {
  return knex.schema.createTable('households', function (tbl) {
    tbl.uuid('household_id').primary();
    tbl.string('household_name', 255).notNullable();
    tbl.integer('household_size').notNullable();
    tbl.integer('household_income').notNullable();
    tbl.integer('location_id').notNullable();
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('households');
};
