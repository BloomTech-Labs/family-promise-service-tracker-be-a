exports.up = function (knex) {
  return knex.schema.createTable('programs', (tbl) => {
    tbl.increments('program_id').primary();
    tbl.string('program_name', 255).notNullable();
    tbl.text('program_description');
    tbl.boolean('program_is_active').notNullable().defaultTo(true);
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('programs');
};

// programs are like categories of service types. For instance,
// Programs:
// 1) Shelter support, description: Serving the currently homeless
// 2) Prevention/Diversion, description: Preventing Homelessness
// 3) Aftercare, description: Supporting families after becoming renters/homeowners again to prevent ending up homeless again
