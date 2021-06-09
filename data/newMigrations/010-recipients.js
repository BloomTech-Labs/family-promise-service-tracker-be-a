exports.up = (knex) => {
    return knex.schema.createTable('recipients', function (tbl) {
        tbl.uuid('recipient_id').primary();
        tbl.string('recipient_first_name');
        tbl.string('recipient_middle_name');
        tbl.string('recipient_last_name');
        tbl.date('recipient_date_of_birth');
        tbl.boolean('recipient_veteran_status');
        tbl.uuid('household_id')
            .unsigned()
            .references('household_id')
            .inTable('households')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT');
        tbl.int('gender_id')
            .unsigned()
            .references('gender_id')
            .inTable('genders')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT');
        tbl.int('race_id')
            .unsigned()
            .references('race_id')
            .inTable('races')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT');
        tbl.int('ethnicity')
            .unsigned()
            .references('ethnicity')
            .inTable('ethnicities')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT');
        tbl.timestamps(true, true);
    });
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('recipients');
};
