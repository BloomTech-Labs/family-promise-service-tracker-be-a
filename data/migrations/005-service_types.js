exports.up = (knex) => {
  return knex.schema.createTable('service_types', function (tbl) {
    tbl.increments('id').primary();
    tbl.string('name').notNullable().unique();
    tbl.text('description');
    tbl
      .integer('program_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('programs')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('service_types');
};
