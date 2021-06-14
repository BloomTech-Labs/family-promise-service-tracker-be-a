exports.up = function (knex) {
  return knex.schema.createTable('locations', function (tbl) {
    tbl.increments('location_id');
    tbl.string('location_name').notNullable();
    tbl.text('location_description').notNullable();
    tbl.text('address').notNullable();
    tbl.text('address_line2');
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
