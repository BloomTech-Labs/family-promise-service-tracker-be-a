exports.up = function (knex) {
    return knex.schema.createTable('service_categories', tbl => {
        tbl.increments('service_category_id')
            .primary();
        tbl.string('service_category_description', 1000)
            .notNullable();
        tbl.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('service_categories');
};
