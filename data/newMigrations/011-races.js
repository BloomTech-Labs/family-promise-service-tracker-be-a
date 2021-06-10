exports.up = (knex) => {
    return knex.schema.createTable('races', function (tbl) {
        tbl.increments('race_id');
        tbl.string('race').notNullable();
    });
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('races');
};
