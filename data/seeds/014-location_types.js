const location_types = [
  {
    location_type: 'Personal Home',
    location_type_description: '',
  },
  {
    location_type: 'Halfway House',
    location_type_description: '',
  },
  {
    location_type: 'Service Distribution Center',
    location_type_description: '',
  },
  {
    location_type: 'Unaffiliated Service Distribution Location',
    location_type_description:
      'For Services distributed to a recipient that is not a address that is legally associated with the recipient or providers',
  },
];

exports.seed = function (knex) {
  return knex('location_types').insert(location_types);
};
