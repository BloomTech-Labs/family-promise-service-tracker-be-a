const ethnicities = [
  {
    ethnicity: 'Hispanic',
  },
  {
    ethnicity: 'Non-Hispanic',
  },
  {
    ethnicity: 'Decline to say',
  },
];

exports.seed = function (knex) {
  return knex('ethnicities').insert(ethnicities);
};
