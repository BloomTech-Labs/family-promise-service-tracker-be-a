exports.up = function (knex) {
  return knex.schema.createTable('locations', function (tbl) {
    tbl.uuid('location_id').primary().defaultTo(knex.raw('gen_random_uuid ()'));
    tbl
      .integer('location_type_id')
      .unsigned()
      .notNullable()
      .references('location_type_id')
      .inTable('location_types')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
    tbl.string('location_name', 255);
    tbl.text('location_description');
    tbl.string('address', 255).notNullable();
    tbl.string('address_line2', 255);
    tbl.string('city', 255).notNullable();
    tbl.string('state', 255).notNullable();
    tbl.string('zip', 255).notNullable();
    tbl.string('county').notNullable();
    tbl.string('country').notNullable();
    tbl.decimal('location_longitude').notNullable();
    tbl.decimal('location_latitude').notNullable();
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('locations');
};
