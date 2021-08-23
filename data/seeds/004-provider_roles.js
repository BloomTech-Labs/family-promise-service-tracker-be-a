const provider_roles = [
  {
    provider_role: 'Administrator',
    provider_role_description: '',
  },
  {
    provider_role: 'Program Manager',
    provider_role_description: '',
  },
  {
    provider_role: 'Service Provider',
    provider_role_description: '',
  },
  //   { // Do these need to live in the app? or are they all just service providers? Ask Stakeholder
  //     provider_role: 'Case Manager',
  //     provider_role_description: '',
  //   },
  //   {
  //     provider_role: 'Volunteer',
  //     provider_role_description: '',
  //   },
  //   {
  //     provider_role: 'Intern',
  //     provider_role_description: '',
  //   },
];

exports.seed = function (knex) {
  return knex('provider_roles').insert(provider_roles);
};
