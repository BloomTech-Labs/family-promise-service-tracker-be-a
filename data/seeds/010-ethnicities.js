const ethnicities = [
  {
    ethnicity: 'Hispanic/Latino',
  },
  {
    ethnicity: 'Non-Hispanic/Non-Latino',
  },
  {
    ethnicity: 'Prefer not to say',
  },
];

exports.seed = function (knex) {
  return knex('ethnicities').insert(ethnicities);
};
