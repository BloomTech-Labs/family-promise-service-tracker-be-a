const location_types = [
  {
    location_type: 'Personal Home',
    location_type_description: '',
    is_recipient_residence: true,
  },
  {
    location_type: 'Halfway House',
    location_type_description: '',
    is_recipient_residence: true,
  },
  {
    location_type: 'Service Distribution Center',
    location_type_description: '',
    is_recipient_residence: false,
  },
  {
    location_type: 'Unaffiliated Service Distribution Location',
    location_type_description:
      'For Services distributed to a recipient that is not an address that is legally associated with the recipient or providers',
    is_recipient_residence: false,
  },
];

const seed = function (knex) {
  return knex('location_types').insert(location_types);
};

module.exports = {
  seed,
  location_types,
};
