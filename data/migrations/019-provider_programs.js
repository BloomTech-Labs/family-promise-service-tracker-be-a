exports.up = function (knex) {
  return knex.schema.createTable('provider_programs', (tbl) => {
    tbl.increments('provider_programs_id').primary();
    tbl
      .string('provider_id')
      .unsigned()
      .notNullable()
      .references('provider_id')
      .inTable('providers')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
    tbl
      .integer('program_id')
      .unsigned()
      .notNullable()
      .references('program_id')
      .inTable('programs')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('provider_programs');
};
