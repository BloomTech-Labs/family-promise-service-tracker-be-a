const service_entry_recipients = [
  {
    service_entry_id: '5eefe344-263f-4248-8a8b-a005fde89fc7',
    recipient_id: 'ec6f7c16-d064-4ae3-a759-4fea047f2c76'
  },
];

exports.seed = function (knex) {
  return knex('service_entry_recipients').insert(service_entry_recipients);
};
