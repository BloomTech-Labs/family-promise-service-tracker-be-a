const providers = [
  {
    provider_id: 'd49e0c39-010f-481c-862a-df8c193ed7ac',
    role: 'Administrator',
    provider_first_name: 'Abigail',
    provider_last_name: 'Administrator',
    provider_email: 'fp.servicetracker+admin@gmail.com',
    provider_phone_number: '123-456-7890',
    employee_id: 'A001',
    provider_avatar_url: `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
      'Abigail Administrator'
    )}.svg`,
  },
  {
    provider_id: '3c5f8ea6-1df4-47c2-b468-99d377486ea3',
    role: 'Program Manager',
    provider_first_name: 'Patty',
    provider_last_name: 'Program',
    provider_email: 'fp.servicetracker+program@gmail.com',
    provider_phone_number: '123-456-7891',
    employee_id: 'PM001',
    provider_avatar_url: `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
      'Patty Program'
    )}.svg`,
  },
  {
    provider_id: '2d9f744c-b035-484f-9cc0-e9b718c9286c',
    role: 'Service Provider',
    provider_first_name: 'Sally',
    provider_last_name: 'Service',
    provider_email: 'fp.servicetracker+service@gmail.com',
    provider_phone_number: '123-456-7892',
    employee_id: 'SP001',
    provider_avatar_url: `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
      'Sally Service'
    )}.svg`,
  },
];

exports.seed = function (knex) {
  return knex('providers').insert(providers);
};
