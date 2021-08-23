exports.up = function (knex) {
  return knex.schema.createTable('service_type_programs', (tbl) => {
    tbl.increments('service_type_program_id').primary();
    tbl
      .integer('program_id')
      .unsigned()
      .notNullable()
      .references('program_id')
      .inTable('programs')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
    tbl
      .integer('service_type_id')
      .unsigned()
      .notNullable()
      .references('service_type_id')
      .inTable('service_types')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('service_type_programs');
};
