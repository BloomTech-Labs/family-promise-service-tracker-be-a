exports.up = function (knex) {
  return knex.schema.createTable('program_providers', (tbl) => {
    tbl.increments('program_providers_id').primary();
    tbl
      .integer('program_id', 128)
      .unsigned()
      .notNullable()
      .references('program_id')
      .inTable('programs')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    tbl
      .string('provider_id')
      .unsigned()
      .notNullable()
      .references('provider_id')
      .inTable('providers')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('program_providers');
};
