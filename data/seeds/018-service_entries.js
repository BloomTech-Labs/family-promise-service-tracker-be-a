const faker = require('faker/locale/en_US');

const {
  fakeServiceEntryIds,
  getRandWithZero,
  getRand,
} = require('../seedHelpers');

// need these for the faker and mapper
const { service_type_programs } = require('./003-service_type_programs');
const { recipients } = require('./015-recipients');
const { providers } = require('./005-providers');
const { locations } = require('./013-locations');

const service_entries = fakeServiceEntryIds.map((id) => {
  const providerNumToUse = getRandWithZero(providers.length);
  const recipientNumToUse = getRandWithZero(recipients.length);
  const stpNumToUse = getRand(service_type_programs.length);
  const locationNumToUse = getRandWithZero(locations.length);
  return {
    service_entry_id: id,
    primary_provider_id: providers[providerNumToUse].provider_id,
    primary_recipient_id: recipients[recipientNumToUse].recipient_id,
    service_type_program_id: stpNumToUse,
    apply_service_to_household: faker.datatype.boolean(),
    service_date: faker.date.past(3),
    service_time: faker.time.recent('abbr'),
    service_duration: null,
    service_value: getRandWithZero(300),
    service_quantity: null,
    service_entry_notes: '',
    // service_entry_data: {
    //   custom: fakeServiceEntryTypeCustomData(serviceTypeNumToUse - 1), // In this case using '-1' since the fake service creator is zero indexed
    // },
    service_entry_data: {}, // keeping above for now, may get rid of it
    service_unit_id: null,
    status_id: getRand(4),
    service_rating_id: getRand(5),
    location_id: locations[locationNumToUse].location_id,
    // location_id: locations[0]['location_id'],
  };
});

exports.seed = function (knex) {
  return knex('service_entries').insert(service_entries);
};

// function fakeServiceEntryTypeCustomData(entryNum) {
//   let aller;

//   return [
//     {
//       'Bus Service Provider': [
//         'Spokane Transit Authority',
//         'InterCity Transit',
//         'FlixBus',
//         'Greyhound',
//       ][getRandWithZero(4)],
//     },
//     {
//       'Date rent is due': (function () {
//         const date = faker.date.soon();
//         return date;
//       })(),
//       'Is rental assistance expected to be required again next month?': [
//         'Yes',
//         'No',
//         'Unclear',
//       ][getRandWithZero(3)],
//     },
//     {
//       'Food for what amount of persons?': getRand(8),
//       'Food Allergies?': (function () {
//         const allergyOptions = [
//           'None',
//           'Shellfish',
//           'Peanuts',
//           'Gluten',
//           'Milk',
//           'Eggs',
//           'Other',
//         ];
//         const output = [];
//         allergyOptions.forEach((alg) => {
//           if (output.includes('None')) {
//             aller = 'None';
//             return;
//           } else if (getRand(10) > 8) {
//             if (alg === 'Other') {
//               aller = alg;
//             }
//             output.push(alg);
//           }
//         });
//         if (output.length === 0) {
//           aller = 'None';
//           output.push('None');
//         }
//         return output;
//       })(),
//       'If other allergy, what allergy?': (function () {
//         if (aller === 'Other') {
//           return 'Red Meat Protein';
//         }
//       })(),
//     },
//     {
//       'Bus Service Provider': [
//         'Spokane Transit Authority',
//         'InterCity Transit',
//         'FlixBus',
//         'Greyhound',
//       ][getRandWithZero(4)],
//       'Bus Pass Start Date': faker.date.past(),
//       'Bus Pass End Date': faker.date.future(),
//     },
//     {
//       'Visible emotional state of client': [
//         'Normal',
//         'Excited',
//         'Agitated',
//         'Apathetic',
//         'Distressed',
//         'Depressed',
//         'Other',
//       ][getRandWithZero(7)],
//       'Is follow up be necessary?': faker.datatype.boolean(),
//     },
//     {
//       'Which life skills were covered?': (function () {
//         const options = [
//           'Budgeting',
//           'Time Management',
//           'Interpersonal Skills',
//           'Meal Planning',
//           'Resume Prep',
//           'Filing Taxes',
//           'Other',
//         ];
//         const output = [];

//         options.forEach((skill) => {
//           if (getRand(10) > 7) {
//             output.push(skill);
//           }
//         });

//         return output;
//       })(),
//       'Will follow up sessions be required?': faker.datatype.boolean(),
//     },
//     {
//       'What was the security deposit for?': [
//         'Apartment',
//         'Vehicle',
//         'Electric Utility',
//         'Water Utility',
//         'Other Utility',
//       ][getRandWithZero(5)],
//       'Refundable security deposit?': faker.datatype.boolean(),
//       'Security deposit due date': faker.date.future(),
//     },
//   ][entryNum];
// }
