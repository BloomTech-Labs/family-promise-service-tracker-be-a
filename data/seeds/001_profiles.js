const profiles = [
  {
    id: '00uk9lxaulDYOiB4H5d6',
    email: 'bg_user@gmail.com',
    firstName: 'bg_user',
    lastName: 'basic',
    role: 'administrator',
    avatarUrl: `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
      'bg_user basic'
    )}.svg`,
  },
  {
    id: '00unr5lzndqVF13jP5d6',
    email: 'fp.servicetracker+admin@gmail.com',
    firstName: 'Abigail',
    lastName: 'Administrator',
    role: 'administrator',
    avatarUrl: `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
      'Abigail Administrator'
    )}.svg`,
  },
  {
    id: '00unr48onuAmU9sxK5d6',
    email: 'fp.servicetracker+program@gmail.com',
    firstName: 'Patty',
    lastName: 'Program',
    role: 'program_manager',
    avatarUrl: `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
      'Patty Program'
    )}.svg`,
  },
  {
    id: '00unr8nm2sJkxkcrH5d6',
    email: 'fp.servicetracker+service@gmail.com',
    firstName: 'Sally',
    lastName: 'Service',
    role: 'service_provider',
    avatarUrl: `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
      'Sally Service'
    )}.svg`,
  },
  {
    id: '00unr3s3m2zHx70ck5d6',
    email: 'fp.servicetracker+unassigned@gmail.com',
    firstName: 'Gary',
    lastName: 'Jerry',
    role: 'unassigned',
    avatarUrl: `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
      'Gary Jerry'
    )}.svg`,
  },
];

exports.seed = function (knex) {
  return knex('profiles').insert(profiles);
};
