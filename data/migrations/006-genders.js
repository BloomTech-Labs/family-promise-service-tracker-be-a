exports.up = (knex) => {
  return knex.schema.createTable('genders', function (tbl) {
    tbl.increments('gender_id').primary();
    tbl.string('gender', 255).notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('genders');
};
