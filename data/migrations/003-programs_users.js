exports.up = function (knex) {
  return knex.schema.createTable('programs_users', (tbl) => {
    tbl.increments('id').primary();
    tbl
      .integer('program_id', 128)
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('programs')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .string('profile_id', 128)
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('programs_users');
};
