const faker = require('faker/locale/en_US');

const {
  fakeServiceEntryIds,
  getRandWithZero,
  getRand,
} = require('../seedHelpers');

const { service_types } = require('./006-service_types');

const service_entries = fakeServiceEntryIds.map((id) => {
  const serviceTypeNumToUse = getRand(service_types.length - 1); // Using '- 1' since we don't want to include service_type_id = 999, which isn't a real service_type
  return {
    service_entry_id: id,
    service_type_id: serviceTypeNumToUse,
    location_id: getRand(100),
    service_date: faker.date.past(3),
    service_time: faker.time.recent('abbr'),
    service_entry_data: {
      default: {
        'Value/Quantity': getRandWithZero(80),
        'Unit of Value/Quantity': [
          'Dollars',
          'Boxes',
          'Cans',
          'Blankets',
          'Tokens',
          'Passes',
          'Other (specify in Notes)',
        ][getRandWithZero(6)],
        Duration: getRand(116) + 4, // So duration will always be at least 5 minutes
        Notes: faker.lorem.paragraph(),
        Status: ['Completed', 'Pending', 'In Progress', 'Follow Up Required'][
          getRandWithZero(4)
        ],
        'Success Rating': getRandWithZero(6),
      },
      custom: fakeServiceEntryTypeCustomData(serviceTypeNumToUse - 1), // In this case using '-1' since the fake service creator is zero indexed
    },
  };
});

exports.seed = function (knex) {
  return knex('service_entries').insert(service_entries);
};

function fakeServiceEntryTypeCustomData(entryNum) {
  let aller;

  return [
    {
      'Bus Service Provider': [
        'Spokane Transit Authority',
        'InterCity Transit',
        'FlixBus',
        'Greyhound',
      ][getRandWithZero(4)],
    },
    {
      'Date rent is due': (function () {
        const date = faker.date.soon();
        return date;
      })(),
      'Is rental assistance expected to be required again next month?': [
        'Yes',
        'No',
        'Unclear',
      ][getRandWithZero(3)],
    },
    {
      'Food for what amount of persons?': getRand(8),
      'Food Allergies?': (function () {
        const allergyOptions = [
          'None',
          'Shellfish',
          'Peanuts',
          'Gluten',
          'Milk',
          'Eggs',
          'Other',
        ];
        const output = [];
        allergyOptions.forEach((alg) => {
          if (output.includes('None')) {
            aller = 'None';
            return;
          } else if (getRand(10) > 8) {
            if (alg === 'Other') {
              aller = alg;
            }
            output.push(alg);
          }
        });
        if (output.length === 0) {
          aller = 'None';
          output.push('None');
        }
        return output;
      })(),
      'If other allergy, what allergy?': (function () {
        if (aller === 'Other') {
          return 'Red Meat Protein';
        }
      })(),
    },
    {
      'Bus Service Provider': [
        'Spokane Transit Authority',
        'InterCity Transit',
        'FlixBus',
        'Greyhound',
      ][getRandWithZero(4)],
      'Bus Pass Start Date': faker.date.past(),
      'Bus Pass End Date': faker.date.future(),
    },
    {
      'Visible emotional state of client': [
        'Normal',
        'Excited',
        'Agitated',
        'Apathetic',
        'Distressed',
        'Depressed',
        'Other',
      ][getRandWithZero(7)],
      'Is follow up be necessary?': faker.datatype.boolean(),
    },
    {
      'Which life skills were covered?': (function () {
        const options = [
          'Budgeting',
          'Time Management',
          'Interpersonal Skills',
          'Meal Planning',
          'Resume Prep',
          'Filing Taxes',
          'Other',
        ];
        const output = [];

        options.forEach((skill) => {
          if (getRand(10) > 7) {
            output.push(skill);
          }
        });

        return output;
      })(),
      'Will follow up sessions be required?': faker.datatype.boolean(),
    },
    {
      'What was the security deposit for?': [
        'Apartment',
        'Vehicle',
        'Electric Utility',
        'Water Utility',
        'Other Utility',
      ][getRandWithZero(5)],
      'Refundable security deposit?': faker.datatype.boolean(),
      'Security deposit due date': faker.date.future(),
    },
  ][entryNum];
}
