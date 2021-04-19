const faker = require('faker');

const providers = ['00uk9lxaulDYOiB4H5d6', '22ulthapbErVUwVJy2x2'];

const getRand = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

const entries = [...new Array(20)].map(() => ({
  service_type_id: getRand(3),
  provided_at: faker.date.past(),
  notes: faker.lorem.sentence(),
  quantity: 1,
  recipient: faker.name.findName(),
  location: faker.fake(
    '{{address.streetAddress}}, {{address.city}}, {{address.stateAbbr}} {{address.zipCode}}'
  ),
  status_id: getRand(4),
  provider_id: providers[getRand(2) - 1],
}));

exports.seed = function (knex) {
  console.log(entries[0]);
  return knex('service_entries').insert(entries);
};
