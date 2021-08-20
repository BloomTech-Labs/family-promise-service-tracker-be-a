const faker = require('faker');

const { getRand, fakeHouseholdIds } = require('../seedHelpers');

const households = fakeHouseholdIds.map((id) => ({
  household_id: id,
  location_id: null, // need to FIX
  household_name: null, // need to FIX
  household_size: Number(getRand(10)),
  household_monthly_income: Number(getRand(4000)),
  is_unstable: faker.datatype.boolean(),
}));

exports.seed = function (knex) {
  return knex('households').insert(households);
};
