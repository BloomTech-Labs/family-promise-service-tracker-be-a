const assignments = [
  {
    program_id: '1',
    profile_id: '00ulthapbasdfErVUwVJy4x6',
  },
  {
    program_id: '2',
    profile_id: '00ulthapbasdfErVUwVJy4x6',
  },
  {
    program_id: '1',
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
