const email_addresses = [
  {
    recipient_id: 'ec6f7c16-d064-4ae3-a759-4fea047f2c76',
    email_addresses: 'aoeu@gmail.com',
    email_addresses_description: 'primary',
  },
  {
    recipient_id: 'ec6f7c16-d064-4ae3-a759-4fea047f2c76',
    email_addresses: 'aoeu@fastmail.com',
    email_addresses_description: 'secondary',
  },
  {
    recipient_id: '81a40c69-b004-4cc8-b6a5-424cbab89b8d',
    email_addresses: 'aoeu@gmail.com',
    email_addresses_description: 'primary',
  },
  {
    recipient_id: '1b1639f9-a614-4d15-93d8-1d0b27ca12a6',
    email_addresses: 'aoeu@gmail.com',
    email_addresses_description: 'primary',
  },
];

exports.seed = function (knex) {
  return knex('email_addresses').insert(email_addresses);
};
