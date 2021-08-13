const faker = require('faker');

const {
  fakeHouseholdIds,
  getRand,
  getRandWithZero,
  fakeRecipientIds,
} = require('../seedHelpers');

const recipients = fakeRecipientIds.map((id) => {
  return {
    recipient_id: id,
    recipient_first_name: faker.name.firstName(),
    recipient_middle_name: faker.name.middleName(),
    recipient_last_name: faker.name.lastName(),
    recipient_date_of_birth: faker.date.past(getRand(70)),
    recipient_veteran_status: faker.datatype.boolean(),
    household_id: fakeHouseholdIds[getRandWithZero(fakeHouseholdIds.length)],
    gender_id: getRand(3),
    race_id: getRand(5),
    ethnicity_id: getRand(2),
    qualify_status: faker.datatype.boolean(),
  };
});

exports.seed = function (knex) {
  return knex('recipients').insert(recipients);
};
