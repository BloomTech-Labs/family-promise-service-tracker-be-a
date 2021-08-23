exports.up = function (knex) {
  return knex.schema.createTable('email_addresses', (tbl) => {
    tbl.increments('email_address_id').primary();
    tbl
      .uuid('recipient_id')
      .notNullable()
      .unsigned()
      .references('recipient_id')
      .inTable('recipients')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('email_address', 255).notNullable();
    tbl.text('email_address_description');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('email_addresses');
};

// need to designate in description the type of email address and it use (home, office, emergency contact, doctor, parole officer, etc)
