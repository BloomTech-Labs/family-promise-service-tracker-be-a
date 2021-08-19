exports.up = function (knex) {
  return knex.schema.createTable('service_types', (tbl) => {
    tbl.increments('service_type_id').primary();
    tbl.string('service_type_name', 255).notNullable();
    tbl.text('service_type_description');
    tbl.boolean('service_type_is_active').notNullable().defaultTo(true);
    tbl.jsonb('service_type_entry_model');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('service_types');
};

// service_type_entry_model is a JSON with customized fields. Need to document a standard format.

// Service Types examples, and how they relate to programs:

// For program1:
// Food/meals
// Showers
// Laundry
// Case management, etc. (stuff like showers is going to be exclusive to this Program, we are only providing showers to the currently homeless)

// For program2:
// Rental assistance
// Case management (rental assistance being exclusive to this program- only providing rental assistance to current tenants (not homeless, not a homeowner)

// For program3:
// Food boxes
// Case management
// (food boxes being exclusive to this program, we don't hand out food boxes to currently homeless, nor to homeowners, etc)

// Service types generally available to all programs:
// Bus pass
// Gas card
// Food card (gift card to safeway,etc)
// Case management
