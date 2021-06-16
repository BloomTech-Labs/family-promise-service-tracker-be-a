const genders = [
  {
    gender: 'Female',
  },
  {
    gender: 'Male',
  },
  {
    gender: 'Nonbinary',
  },
];

exports.seed = function (knex) {
  return knex('genders').insert(genders);
};
