exports.up = function (knex) {
  return knex.schema.createTable('programs', (tbl) => {
    tbl.increments('id').primary();
    tbl.string('name', 128).notNullable().unique();
    tbl.string('type', 128).notNullable();
    tbl.string('description', 256).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('programs');
};
