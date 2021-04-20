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
    provider_id: '22ulthapbErVUwVJy2x2',
  },
  {
    service_type_id: 3,
    provider_id: '22ulthapbErVUwVJy2x2',
  },
];

exports.seed = function (knex) {
  return knex('services_providers').insert(providers);
};
