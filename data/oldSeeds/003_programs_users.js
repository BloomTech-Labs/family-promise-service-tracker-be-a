const assignments = [
  {
    program_id: '1',
    profile_id: '00unr48onuAmU9sxK5d6',
  },
  {
    program_id: '2',
    profile_id: '00unr48onuAmU9sxK5d6',
  },
  {
    program_id: '1',
    profile_id: '00uk9lxaulDYOiB4H5d6',
  },
];

exports.seed = function (knex) {
  return knex('programs_users').insert(assignments);
};
