const knex = require('../../data/db-config');

const findAll = () => {
  return knex('recipients as r')
    .leftJoin('households as h', 'r.household_id', 'h.household_id')
    .leftJoin('genders as g', 'r.gender_id', 'g.gender_id')
    .leftJoin('ethnicities as e', 'r.ethnicity_id', 'e.ethnicity_id')
    .leftJoin('races as ra', 'r.race_id', 'ra.race_id')
    .leftJoin('locations as l', 'h.location_id', 'l.location_id')
    .select(
      'r.*',
      'ra.race',
      'g.gender',
      'e.ethnicity',
      'h.household_name',
      'l.zip'
    );
};

const findByName = async (firstName, middleName, lastName) => {
  return await knex('recipients')
    .leftJoin('households', {
      'recipients.household_id': 'households.household_id',
    })
    .leftJoin('genders', {
      'recipients.gender_id': 'genders.gender_id',
    })
    .leftJoin('races', {
      'recipients.race_id': 'races.race_id',
    })
    .leftJoin('ethnicities', {
      'recipients.ethnicity_id': 'ethnicities.ethnicity_id',
    })
    .select(
      knex.raw(
        'recipients.*, genders.* as gender, races.* as race, ethnicities.* as ethnicity'
      )
    )
    .where({
      'recipients.recipient_first_name': firstName,
      'recipients.recipient_middle_name': middleName,
      'recipients.recipient_last_name': lastName,
    });
};

const create = async (recipients) => {
  let newRecipientsId;
  try {
    await knex.transaction(async (trx) => {
      const createdRecipients = await trx('recipients')
        .insert([
          { recipient_id: recipients.recipient_id },
          { recipient_first_name: recipients.recipient_first_name },
          { recipient_middle_name: recipients.recipient_middle_name },
          { recipient_last_name: recipients.recipient_last_name },
          { recipient_date_of_birth: recipients.recipient_date_of_birth },
          { recipient_veteran_status: recipients.recipient_veteran_status },
        ])
        .returning('*');

      newRecipientsId = createdRecipients[0].recipient_id;
    });

    return await findById(newRecipientsId);
  } catch (err) {
    throw new Error(err);
  }
};

const findById = async (id) => {
  return await knex('recipients')
    .where({ 'recipients.recipients_id': id })
    .leftJoin('households', {
      'recipients.household_id': 'households.household_id',
    })
    .leftJoin('genders', {
      'recipients.gender_id': 'genders.gender_id',
    })
    .leftJoin('races', {
      'recipients.race_id': 'races.race_id',
    })
    .leftJoin('ethnicities', {
      'recipients.ethnicity_id': 'ethnicities.ethnicity_id',
    })
    .select(
      knex.raw(
        'recipients.*, to_json(households.*) as household, to_json(genders.*) as gender, to_json(races.*) as race, to_json(ethnicities.*) as ethnicity'
      )
    )
    .first()
    .groupBy('recipients.recipient_id');
};

module.exports = {
  findByName,
  findAll,
  create,
};
