const faker = require('faker');

const getRand = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

const households = [...new Array(20)].map(() => ({
  address: faker.fake(`{{address.streetAddress}}`),
  city: faker.fake(`{{address.city}}`),
  state: faker.fake(`{{address.stateAbbr}}`),
  zip_code: faker.fake(`{{address.zipCode}}`),
  household_size: Number(getRand(15)),
  household_characteristics: {},
}));

exports.seed = function (knex) {
  return knex('households').insert(households);
};
