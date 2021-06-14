const programs = [
  {
    program_name: 'Prevention',
    program_description:
      'We work to help members of our community stay in their homes and not become homeless.',
  },
  {
    program_name: 'Sheltering',
    program_description:
      'We work to help members of our community stay who have lost their homes.',
  },
  {
    program_name: 'Aftercare',
    program_description:
      'We work to help members of our community who have previously been homeless, but no longer are.',
  },
];

exports.seed = function (knex) {
  return knex('programs').insert(programs);
};
