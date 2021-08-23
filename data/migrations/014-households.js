exports.up = function (knex) {
  return knex.schema.createTable('households', function (tbl) {
    tbl
      .uuid('household_id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid ()'));
    tbl
      .uuid('location_id')
      .unsigned()
      .references('location_id')
      .inTable('locations')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('household_name', 255);
    tbl.integer('household_size');
    tbl.decimal('household_monthly_income');
    tbl.boolean('is_unstable').notNullable().defaultTo(false);
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('households');
};

// Multiple recipients can be a part of a household, and all the occupants of a household can be the recipients of a particular logged service. household_size refers to the current number of occupants of a household. A household_id must be associated with a recipient, even if that recipient is doesn't have an address currently. b/c of this, location_id is nullable. Household describes the social unit, not the physical location.
