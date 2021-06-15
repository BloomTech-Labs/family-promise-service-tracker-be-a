const service_types = [
  {
    program_id: 1,
    service_type_name: 'Bus Tokens',
    service_type_description:
      'Provide recipient with a set amount of bus tokens',
    service_type_entry_model: {
      default: [
        {
          'Name of Field': 'This is the first default',
          Type: 'string',
          Required: true,
          Description: 'This is still being Finalized',
        },
      ],
      custom: [
        {
          'Name of Field': 'This is the first custom',
          Type: 'string',
          Required: false,
          Description: 'This is still being Finalized',
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
      default: [
        {
          'Name of Field': 'This is the first default',
          Type: 'string',
          Required: true,
          Description: 'This is still being Finalized',
        },
      ],
      custom: [
        {
          'Name of Field': 'This is the first custom',
          Type: 'string',
          Required: false,
          Description: 'This is still being Finalized',
        },
      ],
    },
  },
  {
    program_id: 2,
    service_type_name: 'Bus Passes',
    service_type_description:
      'Provide recipient with an unlimited monthly bus pass',
    service_type_entry_model: {
      default: [
        {
          'Name of Field': 'This is the first default',
          Type: 'string',
          Required: true,
          Description: 'This is still being Finalized',
        },
      ],
      custom: [
        {
          'Name of Field': 'This is the first custom',
          Type: 'string',
          Required: false,
          Description: 'This is still being Finalized',
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
      default: [
        {
          'Name of Field': 'This is the first default',
          Type: 'string',
          Required: true,
          Description: 'This is still being Finalized',
        },
      ],
      custom: [
        {
          'Name of Field': 'This is the first custom',
          Type: 'string',
          Required: false,
          Description: 'This is still being Finalized',
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
      default: [
        {
          'Name of Field': 'This is the first default',
          Type: 'string',
          Required: true,
          Description: 'This is still being Finalized',
        },
      ],
      custom: [
        {
          'Name of Field': 'This is the first custom',
          Type: 'string',
          Required: false,
          Description: 'This is still being Finalized',
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
      default: [
        {
          'Name of Field': 'This is the first default field',
          Type: 'string',
          Required: true,
          Description: 'This is still being Finalized',
        },
      ],
      custom: [
        {
          'Name of Field': 'This is the first custom field',
          Type: 'string',
          Required: false,
          Description: 'This is still being Finalized',
        },
      ],
    },
  },
];

exports.seed = function (knex) {
  return knex('service_types').insert(service_types);
};
