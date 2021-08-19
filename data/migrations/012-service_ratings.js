exports.up = (knex) => {
  return knex.schema.createTable('service_ratings', function (tbl) {
    tbl.increments('service_rating_id').primary();
    tbl.integer('service_rating', 255).notNullable();
    tbl.text('service_rating_description');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('service_ratings');
};

// common ratings of the provided service, i.e., cans, tickets, tokens, dollars, classes, etc.
