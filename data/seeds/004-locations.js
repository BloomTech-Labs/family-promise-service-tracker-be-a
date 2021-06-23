const faker = require('faker/locale/en_US');

const { zipCityCombos, getRandWithZero } = require('../seedHelpers');

const locations = [...new Array(100)].map(() => {
  const numToUse = getRandWithZero(zipCityCombos.length);
  return {
    location_name: faker.lorem.word(),
    location_description: faker.lorem.sentence(),
    address: faker.address.streetAddress(),
    address_line2: faker.address.secondaryAddress(),
    city: zipCityCombos[numToUse].city,
    state: 'WA',
    zip: zipCityCombos[numToUse].zip,
    county: faker.address.county(),
    country: 'US',
  };
});

exports.seed = function (knex) {
  return knex('locations').insert(locations);
};
