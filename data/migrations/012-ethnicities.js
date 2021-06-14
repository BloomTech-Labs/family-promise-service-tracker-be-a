exports.up = (knex) => {
  return knex.schema.createTable('ethnicities', function (tbl) {
    tbl.increments('ethnicity_id');
    tbl.string('ethnicity').notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('ethnicities');
};
