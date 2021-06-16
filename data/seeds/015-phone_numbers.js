const phone_numbers = [
  {
    recipient_id: 'ec6f7c16-d064-4ae3-a759-4fea047f2c76',
    phone_number: '1234567890',
    phone_number_description: 'primary',
  },
  {
    recipient_id: 'ec6f7c16-d064-4ae3-a759-4fea047f2c76',
    phone_number: '000000000',
    phone_number_description: 'secondary',
  },
  {
    recipient_id: '81a40c69-b004-4cc8-b6a5-424cbab89b8d',
    phone_number: '0123456789',
    phone_number_description: 'primary',
  },
  {
    recipient_id: '1b1639f9-a614-4d15-93d8-1d0b27ca12a6',
    phone_number: '1010101010',
    phone_number_description: 'primary',
  },
];

exports.seed = function (knex) {
  return knex('phone_numbers').insert(phone_numbers);
};
