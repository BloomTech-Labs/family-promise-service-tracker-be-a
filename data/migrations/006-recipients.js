exports.up = (knex) => {
  return knex.schema.createTable('recipients', function (tbl) {
    tbl.increments('id').primary();
    tbl.string('name').notNullable().unique();
    tbl.string('address', 128);
    tbl.string('city', 128);
    tbl.string('state', 128);
    tbl.integer('zip_code');
    tbl.boolean('veteran_status');
    tbl.integer('household_size');
    tbl.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('recipients');
};
