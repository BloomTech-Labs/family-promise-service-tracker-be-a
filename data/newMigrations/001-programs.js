/* eslint-disable prettier/prettier */
exports.up = function (knex) {
    return knex.schema.createTable('programs', tbl => {
        tbl.increments('program_id').primary();
        tbl.string('program_name', 255).notNullable().unique();
        tbl.string('program_description', 1000).notNullable();
        tbl.timestamps(false, true);
    });
};
  
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('programs');
};