exports.up = function (knex) {
    return knex.schema.createTable('service_type_providers', (tbl) => {
        tbl.increments('service_type_provider_id').primary();
        tbl
        .integer('service_type_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('service_types')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        tbl
        .string('provider_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('providers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        tbl.timestamps(true, true);
    });
};
  
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('service_type_providers');
};
