const faker = require('faker/locale/en_US');

const { zipCityCombos, getRandWithZero } = require('../seedHelpers');

const { location_types } = require('./014-location_types');

const locations = [...new Array(100)].map(() => {
  const numToUse = getRandWithZero(zipCityCombos.length);
  return {
    location_type_id:
      location_types[getRandWithZero(location_types.length)].location_type_id,
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

exports.seed = function (knex) {
  return knex('locations').insert(locations);
};
