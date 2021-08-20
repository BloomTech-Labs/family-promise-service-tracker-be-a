const faker = require('faker');

const { getRand, fakeHouseholdIds } = require('../seedHelpers');

const households = fakeHouseholdIds.map((id) => ({
  household_id: id,
  //   location_id: , // need to fix, get ones from locations tbl
  household_name: faker.fake(`{{name.lastName}}`),
  household_size: Number(getRand(10)),
  household_monthly_income: Number(getRand(4000)),
  //   is_unstable: false, // is not nullable and defaults to 'false', do we need in faker?
  location_id: getRand(100), // remove when above location_id is fixed. Also may not work, re: uuid
}));

exports.seed = function (knex) {
  return knex('households').insert(households);
};
