exports.up = (knex) => {
  return knex.schema.createTable('location_types', (tbl) => {
    tbl.increments('location_type_id').primary();
    tbl.string('location_type', 255).notNullable();
    tbl.text('location_type_description');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('location_types');
};

// location_type: household, service location, etc
