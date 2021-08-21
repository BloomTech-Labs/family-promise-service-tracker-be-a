const faker = require('faker/locale/en_US');

const {
  fakeRecipientIds,
  getRandWithZero,
  fakeDescriptions,
} = require('../seedHelpers');

const phone_numbers = [...new Array(200)].map(() => ({
  recipient_id: fakeRecipientIds[getRandWithZero(fakeRecipientIds.length)],
  phone_number: faker.phone.phoneNumber(),
  phone_number_description:
    fakeDescriptions[getRandWithZero(fakeDescriptions.length)],
}));

exports.seed = function (knex) {
  return knex('phone_numbers').insert(phone_numbers);
};
