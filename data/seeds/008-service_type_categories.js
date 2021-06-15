const service_type_categories = [
  {
    service_category_id: 1,
    service_type_id: 1,
  },
  {
    service_category_id: 2,
    service_type_id: 2,
  },
  {
    service_category_id: 3,
    service_type_id: 3,
  },
];

exports.seed = function (knex) {
  return knex('service_type_categories').insert(service_type_categories);
};
