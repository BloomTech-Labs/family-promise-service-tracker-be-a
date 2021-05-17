exports.up = function (knex) {
  return knex.schema.createTable('households', function (tbl) {
    tbl.increments('id').primary();
    tbl.string('address', 128).notNullable();
    tbl.string('city', 128).notNullable();
    tbl.string('state', 128).notNullable();
    tbl.string('zip_code').notNullable();
    tbl.integer('household_size').notNullable();
    tbl.jsonb('household_characteristics');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('households');
};
