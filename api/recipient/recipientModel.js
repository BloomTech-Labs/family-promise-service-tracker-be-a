const knex = require('../../data/db-config');

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

module.exports = {
  findByName,
};
