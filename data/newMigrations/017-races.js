exports.up = (knex) => {
    return knex.schema.createTable('races', function (tbl) {
        tbl.increments('race_id').primary();
        tbl.string('race');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('races');
};
