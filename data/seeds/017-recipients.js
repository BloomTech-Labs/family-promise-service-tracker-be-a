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
    recipient_is_active: faker.datatype.boolean(),
    recipient_date_of_birth: faker.date.past(getRand(80) + 2),
    recipient_veteran_status: faker.datatype.boolean(),
    has_disability: faker.datatype.boolean(),
    has_valid_ssi: faker.datatype.boolean(),
    has_valid_medicare_card: faker.datatype.boolean(),
    recipient_notes: null,
    household_id: fakeHouseholdIds[getRandWithZero(fakeHouseholdIds.length)],
    gender_id: getRandWithZero(20),
    race_id: getRandWithZero(7),
    ethnicity_id: getRandWithZero(3),
  };
});

exports.seed = function (knex) {
  return knex('recipients').insert(recipients);
};
