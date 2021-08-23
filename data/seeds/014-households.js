const faker = require('faker');

const {
  getRand,
  fakeHouseholdIds,
  getRandWithZero,
} = require('../seedHelpers');

const { locations } = require('./013-locations');

const households = fakeHouseholdIds.map((id) => {
  const locationNumToUse = getRandWithZero(locations.length);

  return {
    household_id: id,
    location_id: locations[locationNumToUse].location_id,
    household_name: null, // need to FIX
    household_size: Number(getRand(10)),
    household_monthly_income: Number(getRand(4000)),
    is_unstable: faker.datatype.boolean(),
  };
});

exports.seed = function (knex) {
  return knex('households').insert(households);
};
