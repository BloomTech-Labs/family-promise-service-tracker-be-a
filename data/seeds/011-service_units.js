const service_units = [
  {
    service_unit_name: 'cans',
    service_unit_description: '',
  },
  {
    service_unit_name: 'boxes',
    service_unit_description: '',
  },
  {
    service_unit_name: 'tickets',
    service_unit_description: '',
  },
  {
    service_unit_name: 'tokens',
    service_unit_description: '',
  },
  {
    service_unit_name: 'dollars',
    service_unit_description: '',
  },
  {
    service_unit_name: 'classes',
    service_unit_description: '',
  },
];

exports.seed = function (knex) {
  return knex('service_units').insert(service_units);
};
