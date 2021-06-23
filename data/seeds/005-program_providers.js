const program_providers = [
  {
    program_id: 1,
    provider_id: '00uk9lxaulDYOiB4H5d6',
  },
  {
    program_id: 2,
    provider_id: '00uk9lxaulDYOiB4H5d6',
  },
  {
    program_id: 3,
    provider_id: '00uk9lxaulDYOiB4H5d6',
  },
  {
    program_id: 1,
    provider_id: '00unr5lzndqVF13jP5d6',
  },
  {
    program_id: 2,
    provider_id: '00unr5lzndqVF13jP5d6',
  },
  {
    program_id: 3,
    provider_id: '00unr5lzndqVF13jP5d6',
  },
  {
    program_id: 1,
    provider_id: '00unr48onuAmU9sxK5d6',
  },
  {
    program_id: 2,
    provider_id: '00unr48onuAmU9sxK5d6',
  },
  {
    program_id: 3,
    provider_id: '00unr48onuAmU9sxK5d6',
  },
  {
    program_id: 1,
    provider_id: '00unr8nm2sJkxkcrH5d6',
  },
  {
    program_id: 2,
    provider_id: '00unr8nm2sJkxkcrH5d6',
  },
  {
    program_id: 3,
    provider_id: '00unr8nm2sJkxkcrH5d6',
  },
  {
    program_id: 1,
    provider_id: '00unr3s3m2zHx70ck5d6',
  },
  {
    program_id: 2,
    provider_id: '00unr3s3m2zHx70ck5d6',
  },
  {
    program_id: 3,
    provider_id: '00unr3s3m2zHx70ck5d6',
  },
];

exports.seed = function (knex) {
  return knex('program_providers').insert(program_providers);
};
