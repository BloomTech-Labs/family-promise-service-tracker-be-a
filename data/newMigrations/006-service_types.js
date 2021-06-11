exports.up = function (knex) {
  return knex.schema.createTable('service_types', (tbl) => {
    tbl.increments('service_type_id').primary();
    tbl.integer('program_id', 128)
      .unsigned()
      .notNullable()
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT')
      .references('programs.program_id');
    tbl.string('service_type_name', 255);
    tbl.text('service_type_description');
    tbl.jsonb('service_type_entry_model');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('service_types');
};
