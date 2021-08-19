const providers = [
  {
    provider_id: '00uk9lxaulDYOiB4H5d6',
    role: 'Administrator',
    provider_first_name: 'BG_User',
    provider_last_name: 'Basic',
    provider_email: 'bg_user@gmail.com',
    provider_phone_number: '123-456-7894',
    employee_id: 'A002',
    provider_avatar_url: `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
      'bg_user basic'
    )}.svg`,
  },
  {
    provider_id: '00unr5lzndqVF13jP5d6',
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
    provider_id: '00unr48onuAmU9sxK5d6',
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
    provider_id: '00unr8nm2sJkxkcrH5d6',
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
  {
    provider_id: '00unr3s3m2zHx70ck5d6',
    role: 'Unassigned',
    provider_first_name: 'Gary',
    provider_last_name: 'Jerry',
    provider_email: 'fp.servicetracker+unassigned@gmail.com',
    provider_phone_number: '123-456-7893',
    employee_id: 'U001',
    provider_avatar_url: `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
      'Gary Jerry'
    )}.svg`,
  },
];

exports.seed = function (knex) {
  return knex('providers').insert(providers);
};
