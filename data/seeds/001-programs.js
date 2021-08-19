const programs = [
  {
    program_name: 'Shelter Support',
    program_description:
      'Serving the currently homeless: We work to help members of our community stay who have lost their homes.',
    program_is_active: true,
  },
  {
    program_name: 'Prevention/Diversion',
    program_description:
      'Preventing Homelessness: We work to help members of our community stay in their homes and not become homeless.',
    program_is_active: true,
  },
  {
    program_name: 'Aftercare',
    program_description:
      'Supporting families after becoming renters/homeowners again to prevent ending up homeless again: We work to help members of our community who have previously been homeless, but no longer are.',
    program_is_active: true,
  },
];

exports.seed = function (knex) {
  return knex('programs').insert(programs);
};
