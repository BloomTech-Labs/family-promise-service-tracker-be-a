const service_entry_providers = [
  {
    service_entry_id: '5eefe344-263f-4248-8a8b-a005fde89fc7',
    provider_id: 'x' // needs the provider id
  },
];

exports.seed = function (knex) {
  return knex('service_entry_providers').insert(service_entry_providers);
};
