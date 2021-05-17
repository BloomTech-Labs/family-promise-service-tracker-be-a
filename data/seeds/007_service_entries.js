const faker = require('faker');

const providers = [
  '00uk9lxaulDYOiB4H5d6',
  '00unr48onuAmU9sxK5d6',
  '00unr8nm2sJkxkcrH5d6',
];

const units = ['Bus Fare', 'Food Assistance', 'Childcare', 'Rental Assistance'];

const getRand = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

const entries = [...new Array(20)].map(() => ({
  service_type_id: getRand(3),
  provided_at: faker.date.past(),
  notes: faker.lorem.sentence(),
  unit: units[getRand(4) - 1],
  quantity: getRand(8),
  value: getRand(100),
  address: faker.fake(`{{address.streetAddress}}`),
  city: faker.fake(`{{address.city}}`),
  state: faker.fake(`{{address.stateAbbr}}`),
  zip_code: faker.fake(`{{address.zipCode}}`),
  recipient_id: getRand(19),
  status_id: getRand(4),
  provider_id: providers[getRand(3) - 1],
}));

exports.seed = function (knex) {
  return knex('service_entries').insert(entries);
};
