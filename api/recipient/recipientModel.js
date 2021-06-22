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

module.exports = {
  findAll
};
