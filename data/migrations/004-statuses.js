exports.up = (knex) => {
  return knex.schema.createTable('statuses', function (tbl) {
    tbl.increments('id').primary();
    tbl.string('name').notNullable().unique();
    tbl.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('statuses');
};
