exports.up = (knex) => {
    return knex.schema.createTable('recipients', function (tbl) {
        tbl.uuid('recipient_id').primary().defaultTo(knex.raw('gen_random_uuid ()'));
        tbl.string('recipient_first_name').notNullable();
        tbl.string('recipient_middle_name');
        tbl.string('recipient_last_name').notNullable();
        tbl.date('recipient_date_of_birth').notNullable();
        tbl.boolean('recipient_veteran_status').notNullable();
        tbl.uuid('household_id').notNullable()
            .unsigned()
            .references('household_id')
            .inTable('households')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT');
        tbl.integer('gender_id').notNullable()
            .unsigned()
            .references('gender_id')
            .inTable('genders')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT');
        tbl.integer('race_id').notNullable()
            .unsigned()
            .references('race_id')
            .inTable('races')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT');
        tbl.integer('ethnicity').notNullable()
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
