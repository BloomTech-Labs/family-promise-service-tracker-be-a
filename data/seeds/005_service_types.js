const service_types = [
  {
    name: 'Bus Passes',
    description: 'Provides city bus passes for work programs',
    program_id: 1,
  },
  {
    name: 'Rental Assitance',
    description: 'Provides monthly rental assistance to prevent foreclosure',
    program_id: 3,
  },
  {
    name: 'Childcare',
    description: 'Provides K-12 childcare support',
    program_id: 2,
  },
];

exports.seed = function (knex) {
  return knex('service_types').insert(service_types);
};
