const faker = require('faker/locale/en_US');

const {
  fakeServiceEntryIds,
  getRandWithZero,
  getRand,
} = require('../seedHelpers');

const { service_types } = require('./006-service_types');

const service_entries = fakeServiceEntryIds.map((id) => {
  const serviceTypeNumToUse = getRand(service_types.length);
  return {
    service_entry_id: id,
    service_type_id: serviceTypeNumToUse,
    location_id: getRand(100),
    service_date: faker.date.past(3),
    service_time: faker.time.recent('abbr'),
    service_entry_data: {
      default: [
        { 'Cost/Value': getRandWithZero(80) },
        { Duration: getRand(120) },
        {
          Notes: faker.lorem.paragraph(),
        },
        {
          Status:
            service_types[0].service_type_entry_model.default[3].options[
              getRandWithZero(4)
            ],
        },
        { 'Success Rating': getRandWithZero(6) },
      ],
      custom: fakeServiceEntryTypeCustomData(serviceTypeNumToUse),
    },
  };
});

exports.seed = function (knex) {
  return knex('service_entries').insert(service_entries);
};

function fakeServiceEntryTypeCustomData(entryNum) {
  return [
    [
      {
        'Bus Service Provider': [
          'Spokane Transit Authority',
          'InterCity Transit',
          'FlixBus',
          'Greyhound',
        ][getRandWithZero(4)],
      },
    ],
    [
      {
        'Date rent is due': faker.date.soon(),
      },
      {
        'Is rental assistance expected to be required again next month?': [
          'Yes',
          'No',
          'Unclear',
        ][getRandWithZero(3)],
      },
    ],
    [
      {
        'Food for what amount of persons?': getRand(8),
      },
      {
        'Food Allergies?': (function () {
          const allergyLotto = getRandWithZero(10);
          const output = [];
          if (allergyLotto <= 3) {
            output.push('none');
          } else if (3 < allergyLotto <= 5) {
            output.push('Shellfish');
          } else if (5 < allergyLotto <= 7) {
            output.push('Shellfish', 'Peanuts');
          } else if (7 < allergyLotto <= 9) {
            output.push('Gluten');
          } else {
            output.push('Peanuts', 'Gluten', 'Milk', 'Eggs', 'Other');
          }
          return output;
        })(),
      },
      {
        'If other allergy, what allergy?': (function () {
          const specialAllergy = getRand(100);
          if (specialAllergy > 80) {
            return 'Red Meat Protein';
          }
        })(),
      },
    ],
    [
      {
        'Bus Service Provider': [
          'Spokane Transit Authority',
          'InterCity Transit',
          'FlixBus',
          'Greyhound',
        ][getRandWithZero(4)],
      },
      {
        'Bus Pass Start Date': faker.date.past(),
      },
      {
        'Bus Pass End Date': faker.date.future(),
      },
    ],
    [
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
      },
      {
        'Is follow up be necessary?': faker.datatype.boolean(),
      },
    ],
    [
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
            if (getRand(10) > 5) {
              output.push(skill);
            }
          });

          return output;
        })(),
      },
      {
        'Will follow up sessions be required?': faker.datatype.boolean(),
      },
    ],
    [
      {
        'What was the security deposit for?': [
          'Apartment',
          'Vehicle',
          'Electric Utility',
          'Water Utility',
          'Other Utility',
        ][getRandWithZero(5)],
      },
      {
        'Refundable security deposit?': faker.datatype.boolean(),
      },
      {
        'Security deposit due date': faker.date.future(),
      },
    ],
  ][entryNum];
}
