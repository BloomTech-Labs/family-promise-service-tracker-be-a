const assignments = [
  {
    program_id: '49365015-1fea-4b56-a635-638388df5c64',
    profile_id: '00ulthapbasdfErVUwVJy4x6',
  },
  {
    program_id: 'ee313f99-22cf-4a1b-b073-3d6b5c625004',
    profile_id: '00ulthapbasdfErVUwVJy4x6',
  },
  {
    program_id: 'ee313f99-22cf-4a1b-b073-3d6b5c625004',
    profile_id: '00uk9lxaulDYOiB4H5d6',
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('programs_users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('programs_users').insert(assignments);
    });
};
