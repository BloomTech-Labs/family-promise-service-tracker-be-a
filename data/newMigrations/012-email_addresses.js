exports.up = function (knex) {
  return knex.schema.createTable('email_addresses', (tbl) => {
    tbl.increments('email_address_id').primary();
    tbl
      .integer('recipient_id')
      .notNullable()
      .unsigned()
      .references('recipient_id')
      .inTable('recipients')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('email_address', 255);
    tbl.string('email_address_description');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTablesIfExists('email_addresses');
};
