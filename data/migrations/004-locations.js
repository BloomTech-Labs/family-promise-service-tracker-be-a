exports.up = function (knex) {
  return knex.schema.createTable('locations', function (tbl) {
    tbl.increments('location_id').primary();
    tbl.string('location_name').notNullable();
    tbl.string('location_description').notNullable();
    tbl.string('address').notNullable();
    tbl.string('address_line2').notNullable();
    tbl.string('city').notNullable();
    tbl.string('state').notNullable();
    tbl.string('zip').notNullable();
    tbl.string('country').notNullable();
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('locations');
};
