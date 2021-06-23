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
    service_category_id: 4,
    service_type_id: 3,
  },
  {
    service_category_id: 1,
    service_type_id: 4,
  },
  {
    service_category_id: 6,
    service_type_id: 5,
  },
  {
    service_category_id: 5,
    service_type_id: 6,
  },
  {
    service_category_id: 2,
    service_type_id: 7,
  },
  {
    service_category_id: 3,
    service_type_id: 7,
  },
];

exports.seed = function (knex) {
  return knex('service_type_categories').insert(service_type_categories);
};
