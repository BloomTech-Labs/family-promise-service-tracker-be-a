exports.up = (knex) => {
  return knex.schema.createTable('recipients', function (tbl) {
    tbl.increments('id').primary();
    tbl.string('name').notNullable();
    tbl.integer('age').notNullable();
    tbl.enu('ethnicity', [
      'american_indian/alaska_native',
      'asian',
      'black/african_american',
      'hawiian/pacific_islander',
      'white',
    ]);
    // add drop down for sub ethnicity categories ? example: (hispanic/latino or not hispanic or latino)
    // todo: inclusive gender table
    tbl.string('address', 128); // address to use if currently in homeless shelter?
    tbl.string('city', 128).notNullable();
    tbl.string('state', 128).notNullable();
    tbl.string('zip_code').notNullable();
    tbl.boolean('veteran_status').notNullable();
    tbl.integer('household_size').notNullable();
    // todo: household characteristics? generational?
    // todo: foreign key to other recipient id (children, etc)
    tbl.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('recipients');
};
