exports.up = function (knex) {
  return knex.schema.createTable('programs', (tbl) => {
    tbl.increments('program_id');
    tbl.string('program_name', 255).notNullable();
    tbl.text('program_description').notNullable();
    tbl.boolean('program_is_active').notNullable().defaultTo(true);
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('programs');
};
