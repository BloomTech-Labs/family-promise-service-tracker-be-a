const providers = [
  {
    service_type_id: 1,
    provider_id: '00uk9lxaulDYOiB4H5d6',
  },
  {
    service_type_id: 2,
    provider_id: '00uk9lxaulDYOiB4H5d6',
  },
  {
    service_type_id: 1,
    provider_id: '00unr8nm2sJkxkcrH5d6',
  },
  {
    service_type_id: 3,
    provider_id: '00unr8nm2sJkxkcrH5d6',
  },
];

exports.seed = function (knex) {
  return knex('services_providers').insert(providers);
};
