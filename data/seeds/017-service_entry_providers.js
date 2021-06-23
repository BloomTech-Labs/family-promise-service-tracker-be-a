const {
  providerIds,
  fakeServiceEntryIds,
  getRandWithZero,
} = require('../seedHelpers');

const service_entry_providers = fakeServiceEntryIds.map((id) => {
  return {
    service_entry_id: id,
    provider_id: providerIds[getRandWithZero(providerIds.length)],
  };
});

exports.seed = function (knex) {
  return knex('service_entry_providers').insert(service_entry_providers);
};
