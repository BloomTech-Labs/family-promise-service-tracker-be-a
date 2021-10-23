const provider_programs = [
  {
    provider_id: '00unr5lzndqVF13jP5d6',
    program_id: 1,
  },
  {
    provider_id: '00unr5lzndqVF13jP5d6',
    program_id: 2,
  },
  {
    provider_id: '00unr5lzndqVF13jP5d6',
    program_id: 3,
  },
  {
    provider_id: '00unr48onuAmU9sxK5d6',
    program_id: 3,
  },
];

const seed = function (knex) {
  return knex('provider_programs').insert(provider_programs);
};

module.exports = {
  provider_programs,
  seed,
};
