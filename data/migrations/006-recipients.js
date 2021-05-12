exports.up = (knex) => {
  return knex.schema.createTable('recipients', function (tbl) {
    tbl.increments('id').primary();
    tbl.string('name').notNullable();
    tbl.integer('age').notNullable();
    tbl.enu('race', [
      'indian_native_alaskan',
      'asian',
      'black',
      'hawaiian_pacific_islander',
      'white',
    ]);
    tbl.enu('gender', ['male', 'female', 'nonbinary']);
    // todo: how to add include value? (hispanic/latino or not hispanic or latino)
    // todo: add LGBTQ+ status? "Do recipient identify as LGBTQ+? Answer: boolean"
    // todo: foreign key to other recipient id (children, etc)
    // todo: household characteristics? generational?
    tbl.string('address', 128);
    tbl.string('city', 128).notNullable();
    tbl.string('state', 128).notNullable();
    tbl.string('zip_code').notNullable();
    tbl.boolean('veteran_status').notNullable();
    tbl.integer('household_size').notNullable();
    tbl.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('recipients');
};
