const faker = require('faker/locale/en_US');

const {
  zipCityCombos,
  getRandWithZero,
  //   fakeLocationIds,
} = require('../seedHelpers');

const locations = [...new Array(100)].map(() => {
  const numToUse = getRandWithZero(zipCityCombos.length);
  return {
    // location_type_id: fakeLocationIds[getRandWithZero(fakeLocationIds.length)], // need to fix this
    location_name: faker.lorem.word(),
    location_description: faker.lorem.sentence(),
    address: faker.address.streetAddress(),
    address_line2: faker.address.secondaryAddress(),
    city: zipCityCombos[numToUse].city,
    state: 'WA',
    zip: zipCityCombos[numToUse].zip,
    county: faker.address.county(),
    country: 'US',
    location_longitude: 1.1, // need to fix this
    location_latitude: 1.1, // need to fix this
  };
});

exports.seed = function (knex) {
  return knex('locations').insert(locations);
};
