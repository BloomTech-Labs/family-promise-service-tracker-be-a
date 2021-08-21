exports.up = (knex) => {
  return knex.schema.createTable('statuses', function (tbl) {
    tbl.increments('status_id').primary();
    tbl.string('status', 255).notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('statuses');
};

// Current status of the entered service: Completed, In-Progress, Needs Follow-up, etc.
