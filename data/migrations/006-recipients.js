exports.up = (knex) => {
  return knex.schema.createTable('recipients', function (tbl) {
    tbl.increments('id').primary();
    tbl.string('first_name').notNullable();
    tbl.string('last_name').notNullable();
    tbl.integer('age').notNullable();
    tbl.enu('race', [
      'indian_native_alaskan',
      'asian',
      'black',
      'hawaiian_pacific_islander',
      'white',
    ]);
    tbl.enu('ethnicity', ['hispanic', 'not_hispanic']);
    tbl.enu('gender', ['male', 'female', 'nonbinary']);
    tbl.string('address', 128).notNullable();
    tbl.string('city', 128).notNullable();
    tbl.string('state', 128).notNullable();
    tbl.string('zip_code').notNullable();
    tbl.boolean('veteran_status').notNullable();
    tbl.integer('household_size').notNullable();
    tbl.text('household_characteristics');
    tbl.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('recipients');
};
