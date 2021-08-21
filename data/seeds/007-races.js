const races = [
  {
    race: 'White',
  },
  {
    race: 'Black/African-American',
  },
  {
    race: 'Asian',
  },
  {
    race: 'Native American/First Peoples',
  },
  {
    race: 'Hawaiian/Pacific Islander',
  },
  {
    race: 'Other',
  },
  {
    race: 'Prefer not to say',
  },
];

exports.seed = function (knex) {
  return knex('races').insert(races);
};
