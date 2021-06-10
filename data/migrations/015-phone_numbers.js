exports.up = function (knex) {
  return knex.schema.createTable('phone_numbers', (tbl) => {
    tbl.increments('phone_number_id').primary();
    tbl
      .uuid('recipient_id')
      .notNullable()
      .unsigned()
      .references('recipient_id')
      .inTable('recipients')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    tbl.string('phone_number', 128);
    tbl.string('phone_number_description', 128);
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('phone_numbers');
};
