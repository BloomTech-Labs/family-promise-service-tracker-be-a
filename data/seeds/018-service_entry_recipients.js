const {
  fakeRecipientIds,
  fakeServiceEntryIds,
  getRandWithZero,
} = require('../seedHelpers');

const service_entry_recipients = fakeServiceEntryIds.map((id) => {
  return {
    service_entry_id: id,
    recipient_id: fakeRecipientIds[getRandWithZero(fakeRecipientIds.length)],
  };
});

exports.seed = function (knex) {
  return knex('service_entry_recipients').insert(service_entry_recipients);
};
