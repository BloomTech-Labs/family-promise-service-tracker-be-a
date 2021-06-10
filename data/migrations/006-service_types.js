exports.up = function (knex) {
  return knex.schema.createTable('service_types', (tbl) => {
    tbl.increments('service_type_id');
    tbl
      .integer('program_id', 128)
      .unsigned()
      .notNullable()
      .references('program_id')
      .inTable('programs')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
    tbl.string('service_type_name', 255);
    tbl.text('service_type_description');
    tbl.jsonb('service_type_entry_model');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('service_types');
};
