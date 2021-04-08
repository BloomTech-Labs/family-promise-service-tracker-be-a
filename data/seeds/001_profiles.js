const profiles = [
  {
    id: '00uk9lxaulDYOiB4H5d6',
    email: 'bg_user@gmail.com',
    name: 'bg_user basic',
    role: 'unassigned',
  },
  {
    id: '00ulthapbErVUwVJy4x6',
    email: 'llama001@maildrop.cc',
    name: 'Abigail Administrator',
    role: 'administrator',
  },
  {
    id: '00ulthapbasdfErVUwVJy4x6',
    email: 'llama002@maildrop.cc',
    name: 'Patty Program',
    role: 'program_manager',
  },
  {
    id: '00ulthaasdfgaspbErVUwVJy4x6',
    email: 'llama003@maildrop.cc',
    name: 'Sally Service',
    role: 'service_provider',
  },
  {
    id: '00ulthapbErgasfdsVUwVJy4x6',
    email: 'llama004@maildrop.cc',
    name: 'Gary Jerry',
    role: 'unassigned',
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
