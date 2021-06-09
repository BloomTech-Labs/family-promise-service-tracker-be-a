exports.up = (knex) => {
    return knex.schema.createTable('ethnicities', function (tbl) {
        tbl.increments('ethnicity_id').primary();
        tbl.string('ethnicity');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('ethnicities');
};
