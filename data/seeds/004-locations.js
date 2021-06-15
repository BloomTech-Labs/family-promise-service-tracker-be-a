const faker = require('faker/locale/en_US');

const locations = [...new Array(20)].map(() => ({
  location_name: faker.lorem.word(),
  location_description: faker.lorem.sentence(),
  address: faker.address.streetAddress(),
  address_line2: faker.address.secondaryAddress(),
  city: faker.address.cityName(),
  state: 'WA',
  zip: faker.address.zipCodeByState('WA'),
  county: faker.address.county(),
  country: 'US',
}));

exports.seed = function (knex) {
  return knex('locations').insert(locations);
};
