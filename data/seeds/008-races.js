const races = [
  {
    race: "White",
  },
  {
    race: "Black/African-American",
  },
  {
    race: "Asian",
  },
  {
    race: "Hawaiian/Pacific Islander",
  },
  {
    race: "Some other race",
  },
];

exports.seed = function (knex) {
  return knex('races').insert(races);
};
