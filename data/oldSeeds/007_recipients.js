const faker = require('faker');

const race = [
  'indian_native_alaskan',
  'asian',
  'black',
  'hawaiian_pacific_islander',
  'white',
];

const ethnicities = ['hispanic', 'not_hispanic'];

const genders = ['male', 'female', 'nonbinary'];

const getRand = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

const recipients = [...new Array(20)].map(() => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  age: Number(getRand(121)),
  race: race[getRand(5) - 1],
  ethnicity: ethnicities[getRand(2) - 1],
  gender: genders[getRand(3) - 1],
  veteran_status: faker.random.boolean(),
  household_id: getRand(19),
}));

exports.seed = function (knex) {
  return knex('recipients').insert(recipients);
};
