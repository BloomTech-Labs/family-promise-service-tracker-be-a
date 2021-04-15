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
    id: '00ulthapbErVUwVJy4x6',
    email: 'llama001@maildrop.cc',
    firstName: 'Abigail',
    lastName: 'Administrator',
    role: 'administrator',
    avatarUrl: `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
      'Abigail Administrator'
    )}.svg`,
  },
  {
    id: '00ulthapbasdfErVUwVJy4x6',
    email: 'llama002@maildrop.cc',
    firstName: 'Patty',
    lastName: 'Program',
    role: 'program_manager',
    avatarUrl: `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
      'Patty Program'
    )}.svg`,
  },
  {
    id: '00ulthaasdfgaspbErVUwVJy4x6',
    email: 'llama003@maildrop.cc',
    firstName: 'Sally',
    lastName: 'Service',
    role: 'service_provider',
    avatarUrl: `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
      'Sally Service'
    )}.svg`,
  },
  {
    id: '00ulthapbErgasfdsVUwVJy4x6',
    email: 'llama004@maildrop.cc',
    firstName: 'Gary',
    lastName: 'Jerry',
    role: 'unassigned',
    avatarUrl: `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
      'Gary Jerry'
    )}.svg`,
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert(profiles);
    });
};
