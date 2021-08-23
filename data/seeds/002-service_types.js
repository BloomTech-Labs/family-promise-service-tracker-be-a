const service_types = [
  {
    service_type_id: 999,
    service_type_name: 'New Service Type',
    service_type_description: 'Give your service providers a description',
    service_type_entry_model: {
      custom: [
        {
          name_of_field: 'What do you want this field called?',
          description: 'Add a description!',
          data_type: 'text',
          required: true,
          display_field_as: 'entry',
          options: null,
        },
      ],
    },
  },
  {
    service_type_name: 'Showers',
    service_type_description:
      'Self cleaning and care opportunities for currently homeless individuals',
    service_type_is_active: true,
    service_type_entry_model: {},
  },
  {
    service_type_name: 'Laundry',
    service_type_description:
      'Personal clothing cleaning opportunities provided to currently homeless individuals',
    service_type_is_active: true,
    service_type_entry_model: {},
  },
  {
    service_type_name: 'Case Management',
    service_type_description: '',
    service_type_is_active: true,
    service_type_entry_model: {},
  },
  {
    service_type_name: 'Food Boxes',
    service_type_description:
      'Food boxes provided to individuals and/or households to solidify stability among current program recipients',
    service_type_is_active: true,
    service_type_entry_model: {
      custom: [
        {
          name_of_field: 'Food for what amount of persons?',
          description: 'How many people need food?',
          data_type: 'quantity',
          required: true,
          display_field_as: 'entry',
          options: null,
        },
        {
          name_of_field: 'Food Allergies?',
          description: 'Are there any allergies we need to be aware of?',
          data_type: 'text',
          required: true,
          display_field_as: 'checkbox',
          options: [
            'None',
            'Shellfish',
            'Peanuts',
            'Gluten',
            'Milk',
            'Eggs',
            'Other',
          ],
        },
        {
          name_of_field: 'If other allergy, what allergy?',
          description: 'Please write the allergy',
          data_type: 'text',
          required: false,
          display_field_as: 'entry',
          options: null,
        },
      ],
    },
  },
  {
    service_type_name: 'Gas card',
    service_type_description:
      'Prepaid gas cards provided to eligible program recipients',
    service_type_is_active: true,
    service_type_entry_model: {
      custom: [], // establish gas card type?
    },
  },
  {
    service_type_name: 'Food card',
    service_type_description:
      'Prepaid food cards provided to eligible program recipients',
    service_type_is_active: true,
    service_type_entry_model: {
      custom: [], // establish food card type? Safeway? Hannafords? Subway sandwiches?
    },
  },
  {
    service_type_name: 'Security Deposit',
    service_type_description:
      'Provide recipient with funding to help secure rental apartment',
    service_type_entry_model: {
      custom: [
        {
          name_of_field: 'What was the security deposit for?',
          description: 'Choose which category fits best',
          data_type: 'text',
          required: true,
          display_field_as: 'dropdown',
          options: [
            'Apartment',
            'Vehicle',
            'Electric Utility',
            'Water Utility',
            'Other Utility',
          ],
        },
        {
          name_of_field: 'Refundable security deposit?',
          description: 'Is this a refundable security deposit?',
          data_type: 'boolean',
          required: true,
          display_field_as: 'dropdown',
          options: [true, false],
        },
        {
          name_of_field: 'Security deposit due date',
          description: 'When does this have to be paid by?',
          data_type: 'date',
          required: true,
          display_field_as: 'entry',
          options: null,
        },
      ],
    },
  },
  {
    service_type_name: 'Bus Tokens',
    service_type_description:
      'Provide recipient with a set amount of bus tokens',
    service_type_entry_model: {
      custom: [
        {
          name_of_field: 'Bus Service Provider',
          description: 'Which bus service are the tokens for?',
          data_type: 'text',
          required: true,
          display_field_as: 'dropdown',
          options: [
            'Spokane Transit Authority',
            'InterCity Transit',
            'FlixBus',
            'Greyhound',
          ],
        },
      ],
    },
  },
  {
    service_type_name: 'Bus Passes',
    service_type_is_active: true,
    service_type_description: 'Provide recipient with a bus pass',
    service_type_entry_model: {
      custom: [
        {
          name_of_field: 'Bus Service Provider',
          description: 'Which bus service are the tokens for?',
          data_type: 'text',
          required: true,
          display_field_as: 'dropdown',
          options: [
            'Spokane Transit Authority',
            'InterCity Transit',
            'FlixBus',
            'Greyhound',
          ],
        },
        {
          name_of_field: 'Bus Pass Start Date',
          description: 'When will the pass start working',
          data_type: 'date',
          required: true,
          display_field_as: 'entry',
          options: null,
        },
        {
          name_of_field: 'Bus Pass End Date',
          description: 'When will the pass stop working',
          data_type: 'date',
          required: true,
          display_field_as: 'entry',
          options: null,
        },
      ],
    },
  },
  {
    service_type_name: 'Rental Assistance',
    service_type_description:
      'Provide recipient experiencing financial hardship with funds to help pay current month of rent',
    service_type_is_active: true,
    service_type_entry_model: {
      custom: [
        {
          name_of_field: 'Date rent is due',
          description: 'When is the rent payment due?',
          data_type: 'date',
          required: true,
          display_field_as: 'entry',
          options: null,
        },
        {
          name_of_field:
            'Is rental assistance expected to be required again next month?',
          description:
            'Based on currently known information, what is your assessment?',
          data_type: 'text',
          required: true,
          display_field_as: 'dropdown',
          options: ['Yes', 'No', 'Unclear'],
        },
      ],
    },
  },
  {
    service_type_name: 'Food Assistance', // for homeless (Listed as Food/Meals in comments from stakeholders)
    service_type_description:
      'Provide recipient experiencing food insecurity with food delivery',
    service_type_entry_model: {
      custom: [
        {
          name_of_field: 'Food for what amount of persons?',
          description: 'How many people need food?',
          data_type: 'quantity',
          required: true,
          display_field_as: 'entry',
          options: null,
        },
        {
          name_of_field: 'Food Allergies?',
          description: 'Are there any allergies we need to be aware of?',
          data_type: 'text',
          required: true,
          display_field_as: 'checkbox',
          options: [
            'None',
            'Shellfish',
            'Peanuts',
            'Gluten',
            'Milk',
            'Eggs',
            'Other',
          ],
        },
        {
          name_of_field: 'If other allergy, what allergy?',
          description: 'Please write the allergy',
          data_type: 'text',
          required: false,
          display_field_as: 'entry',
          options: null,
        },
      ],
    },
  },
  {
    service_type_name: 'Mental Health Counseling',
    service_type_description:
      'Provide recipient with mental health counseling session at the Mental Health Clinic',
    service_type_entry_model: {
      custom: [
        {
          name_of_field: 'Visible emotional state of client',
          description: "How does the client's emotional state appear to you?",
          data_type: 'text',
          required: true,
          display_field_as: 'dropdown',
          options: [
            'Normal',
            'Excited',
            'Agitated',
            'Apathetic',
            'Distressed',
            'Depressed',
            'Other',
          ],
        },
        {
          name_of_field: 'Is follow up be necessary?',
          description: 'Does the client need to be seen again?',
          data_type: 'boolean',
          required: true,
          display_field_as: 'dropdown',
          options: [true, false],
        },
      ],
    },
  },
  {
    service_type_name: 'Life Skills Classes',
    service_type_description:
      'Provide recipient with classes to learn skills required to prevent return to homelessness',
    service_type_entry_model: {
      custom: [
        {
          name_of_field: 'Which life skills were covered?',
          description: "Select which life skills were covered in today's class",
          data_type: 'text',
          required: true,
          display_field_as: 'checkbox',
          options: [
            'Budgeting',
            'Time Management',
            'Interpersonal Skills',
            'Meal Planning',
            'Resume Prep',
            'Filing Taxes',
            'Other',
          ],
        },
        {
          name_of_field: 'If other, what skill was covered, why, and how?',
          description:
            'Please detail the skill that was covered, why they requested that skill, and how you covered teaching it',
          data_type: 'text',
          required: false,
          display_field_as: 'entry',
          options: null,
        },
        {
          name_of_field: 'Will follow up sessions be required?',
          description:
            'Does the recipient require additional sessions to master the skills covered?',
          data_type: 'boolean',
          required: true,
          display_field_as: 'dropdown',
          options: [true, false],
        },
      ],
    },
  },
];

const seed = function (knex) {
  return knex('service_types').insert(service_types);
};

module.exports = {
  service_types,
  seed,
};
