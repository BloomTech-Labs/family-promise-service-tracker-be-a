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

module.exports = {
  findByName,
  findAll,
};
