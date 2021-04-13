exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('programs', (tbl) => {
      tbl.string('id').notNullable().unique().primary();
      tbl.string('name', 128).notNullable().unique();
      tbl.string('type', 128).notNullable();
      tbl.string('description', 256).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('programs');
};
