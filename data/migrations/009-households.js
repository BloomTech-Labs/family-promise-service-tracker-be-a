exports.up = function (knex) {
  return knex.schema.createTable('households', function (tbl) {
    tbl
      .uuid('household_id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid ()'));
    tbl.string('household_name', 255).notNullable();
    tbl.boolean('is_unstable').notNullable().defaultTo(false);
    tbl.integer('household_size').notNullable();
    tbl.integer('household_income').notNullable();
    tbl
      .integer('location_id')
      .notNullable()
      .unsigned()
      .references('location_id')
      .inTable('locations')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('households');
};
