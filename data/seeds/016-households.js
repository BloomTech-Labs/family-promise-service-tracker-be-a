const faker = require('faker');

const { getRand, fakeHouseholdIds } = require('../seedHelpers');

const households = fakeHouseholdIds.map((id) => ({
  household_id: id,
  household_name: faker.fake(`{{name.lastName}}`),
  household_size: Number(getRand(10)),
  household_monthly_income: Number(getRand(60000)),
  location_id: getRand(100),
}));

exports.seed = function (knex) {
  return knex('households').insert(households);
};
