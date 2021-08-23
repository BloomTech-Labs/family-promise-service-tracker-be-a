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
      .onDelete('CASCADE');
    tbl.string('phone_number', 31).notNullable();
    tbl.text('phone_number_description');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('phone_numbers');
};

// need to designate in description the type of phone number (home, office, emergency contact, etc)
