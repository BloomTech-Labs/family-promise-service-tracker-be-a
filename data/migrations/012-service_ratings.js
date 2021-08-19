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

// rating given by (provider, admin, recipient?) to help determine efficacy of received/provided service. Constrain 1-5, 5 being the best.
