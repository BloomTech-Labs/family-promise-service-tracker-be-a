exports.up = (knex) => {
  return knex.schema.createTable('genders', function (tbl) {
    tbl.increments('gender_id');
    tbl.string('gender').notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('genders');
};
