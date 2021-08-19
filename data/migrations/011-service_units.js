exports.up = (knex) => {
  return knex.schema.createTable('service_units', function (tbl) {
    tbl.increments('service_unit_id').primary();
    tbl.string('service_unit_name', 255).notNullable();
    tbl.text('service_unit_description', 255);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('service_units');
};

// common units of the provided service, i.e., cans, tickets, tokens, dollars, classes, etc.
