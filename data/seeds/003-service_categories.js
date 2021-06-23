const service_categories = [
  {
    service_category_name: 'Transportation',
    service_category_description:
      'All services related to transportation assistance.',
  },
  {
    service_category_name: 'Housing',
    service_category_description:
      'All services related to providing assistance for housing.',
  },
  {
    service_category_name: 'Financial',
    service_category_description:
      'All services related to providing non-housing related financial assistance.',
  },
  {
    service_category_name: 'Food',
    service_category_description:
      'All services related to providing food/meal assistance.',
  },
  {
    service_category_name: 'Education',
    service_category_description:
      'All services related to Education and upskilling.',
  },
  {
    service_category_name: 'Health',
    service_category_description: 'All services related to Health.',
  },
];

exports.seed = function (knex) {
  return knex('service_categories').insert(service_categories);
};
