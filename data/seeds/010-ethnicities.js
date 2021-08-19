const ethnicities = [
  {
    ethnicity: 'Hispanic/Latino',
  },
  {
    ethnicity: 'Non-Hispanic/Non-Latino',
  },
  {
    ethnicity: 'Decline to say',
  },
];

exports.seed = function (knex) {
  return knex('ethnicities').insert(ethnicities);
};
