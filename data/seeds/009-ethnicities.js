const ethnicities = [
  {
    ethnicity: 'Hispanic',
  },
  {
    ethnicity: 'Non-Hispanic',
  },
];

exports.seed = function (knex) {
  return knex('ethnicities').insert(ethnicities);
};
