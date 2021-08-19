exports.up = (knex) => {
  return knex.schema.createTable('races', function (tbl) {
    tbl.increments('race_id').primary();
    tbl.string('race', 255).notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('races');
};
