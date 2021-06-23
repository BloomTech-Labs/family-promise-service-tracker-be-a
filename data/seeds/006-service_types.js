const defaultFields = [
  {
    name_of_field: 'Cost/Value',
    description: 'Cost/Value in dollars/quantity',
    data_type: 'number',
    required: false,
    display_field_as: 'entry',
    options: null,
  },
  {
    name_of_field: 'Duration',
    description: 'How long did this event last in minutes?',
    data_type: 'number',
    required: true,
    display_field_as: 'entry',
    options: null,
  },
  {
    name_of_field: 'Notes',
    description: 'Notes on how the service event went.',
    data_type: 'text',
    required: false,
    display_field_as: 'entry',
    options: null,
  },
  {
    name_of_field: 'Status',
    description: 'What is the status of this event?',
    data_type: 'text',
    required: false,
    display_field_as: 'dropdown',
    options: ['Completed', 'Pending', 'In Progress', 'Follow Up Required'],
  },
  {
    name_of_field: 'Success Rating',
    description: 'How successful was this?',
    data_type: 'number',
    required: true,
    display_field_as: 'dropdown',
    options: [0, 1, 2, 3, 4, 5],
  },
];

const service_types = [
  {
    service_type_id: 999,
    program_id: 1,
    service_type_name: 'New Service Type',
    service_type_description: 'Give your service providers a decription',
    service_type_entry_model: {
      default: defaultFields,
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
    program_id: 1,
    service_type_name: 'Bus Tokens',
    service_type_description:
      'Provide recipient with a set amount of bus tokens',
    service_type_entry_model: {
      default: defaultFields,
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
    program_id: 1,
    service_type_name: 'Rental Assistance',
    service_type_description:
      'Provide recipient experiencing financial hardship with funds to help pay current month of rent',
    service_type_entry_model: {
      default: defaultFields,
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
    program_id: 1,
    service_type_name: 'Food Assistance',
    service_type_description:
      'Provide recipient experiencing food insecurity with food delivery',
    service_type_entry_model: {
      default: defaultFields,
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
    program_id: 2,
    service_type_name: 'Bus Passes',
    service_type_description: 'Provide recipient with a bus pass',
    service_type_entry_model: {
      default: defaultFields,
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
    program_id: 2,
    service_type_name: 'Mental Health Counseling',
    service_type_description:
      'Provide recipient with mental health counseling session at the Mental Health Clinic',
    service_type_entry_model: {
      default: defaultFields,
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
    program_id: 3,
    service_type_name: 'Life Skills Classes',
    service_type_description:
      'Provide recipient with classes to learn skills required to prevent return to homelessness',
    service_type_entry_model: {
      default: defaultFields,
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
  {
    program_id: 3,
    service_type_name: 'Security Deposit',
    service_type_description:
      'Provide recipient with funding to help secure rental apartment after homelessness',
    service_type_entry_model: {
      default: defaultFields,
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
          description: 'Is this a refunable security deposit?',
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
];

const seed = function (knex) {
  return knex('service_types').insert(service_types);
};

module.exports = {
  service_types,
  seed,
};
