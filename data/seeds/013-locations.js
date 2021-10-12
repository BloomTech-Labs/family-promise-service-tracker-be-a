const faker = require('faker/locale/en_US');
const { getRand, fakeLocationIds } = require('../seedHelpers');
const { location_types } = require('./012-location_types');
const addresses = require('../addresses_data');

const locations = [];
for (let i = 0; i < addresses.length; i++) {
  const loc_type_ID = getRand(location_types.length);
  const location = {
    location_id: fakeLocationIds[i],
    location_type_id: loc_type_ID,
    location_name: faker.lorem.words(),
    location_description: faker.lorem.sentence(),
    address: addresses[i].address,
    address_line2: addresses[i].address_line2,
    city: addresses[i].city,
    state: addresses[i].state,
    zip: addresses[i].zip,
    county: addresses[i].county,
    country: addresses[i].country,
    location_longitude: addresses[i].location_longitude,
    location_latitude: addresses[i].location_latitude,
  };
  locations.push(location);
}

const seed = function (knex) {
  return knex('locations').insert(locations);
};

module.exports = {
  seed,
  locations,
};
