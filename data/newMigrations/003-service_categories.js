exports.up = function (knex) {
    return knex.schema.createTable('service_categories', tbl => {
        tbl.increments('service_category_id');
        tbl.text('service_category_name', 255)
            .notNullable()
            .unique();
        tbl.text('service_category_description', 1000);
        tbl.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('service_categories');
};
