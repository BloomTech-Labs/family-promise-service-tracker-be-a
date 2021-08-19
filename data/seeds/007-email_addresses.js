const faker = require('faker');

const {
  fakeRecipientIds,
  getRandWithZero,
  fakeDescriptions,
} = require('../seedHelpers');

const email_addresses = [...new Array(200)].map(() => ({
  recipient_id: fakeRecipientIds[getRandWithZero(fakeRecipientIds.length)],
  email_address: faker.internet.email(),
  email_address_description:
    fakeDescriptions[getRandWithZero(fakeDescriptions.length)],
}));

exports.seed = function (knex) {
  return knex('email_addresses').insert(email_addresses);
};
