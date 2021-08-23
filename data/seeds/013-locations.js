const faker = require('faker/locale/en_US');

const {
  zipCityCombos,
  getRand,
  getRandWithZero,
  fakeLocationIds,
} = require('../seedHelpers');

const { location_types } = require('./012-location_types');

const locations = fakeLocationIds.map((id) => {
  const numToUse = getRandWithZero(zipCityCombos.length);
  const loc_type_ID = getRand(location_types.length);

  return {
    location_id: id,
    location_type_id: loc_type_ID,
    location_name: '',
    location_description: faker.lorem.sentence(),
    address: faker.address.streetAddress(),
    address_line2: faker.address.secondaryAddress(),
    city: zipCityCombos[numToUse].city,
    state: 'WA',
    zip: zipCityCombos[numToUse].zip,
    county: faker.address.county(),
    country: 'US',
    location_longitude: 1.1, // need to fix this, edit and give correct long, automate
    location_latitude: 1.1, // need to fix this, edit and give correct lang, automate
  };
});

const seed = function (knex) {
  return knex('locations').insert(locations);
};

module.exports = {
  locations,
  seed,
};
