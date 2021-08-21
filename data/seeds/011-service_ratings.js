const service_ratings = [
  {
    service_rating: 1,
    service_rating_description: 'Went Poorly',
  },
  {
    service_rating: 2,
    service_rating_description: '',
  },
  {
    service_rating: 3,
    service_rating_description: 'Went as expected',
  },
  {
    service_rating: 4,
    service_rating_description: '',
  },
  {
    service_rating: 5,
    service_rating_description: 'Went exceedingly well',
  },
];

exports.seed = function (knex) {
  return knex('service_ratings').insert(service_ratings);
};
