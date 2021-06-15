const program_providers = [
  {
    program_id: 1,
    provider_id: 'd49e0c39-010f-481c-862a-df8c193ed7ac',
  },
  {
    program_id: 2,
    provider_id: 'd49e0c39-010f-481c-862a-df8c193ed7ac',
  },
  {
    program_id: 3,
    provider_id: 'd49e0c39-010f-481c-862a-df8c193ed7ac',
  },
  {
    program_id: 1,
    provider_id: '3c5f8ea6-1df4-47c2-b468-99d377486ea3',
  },
  {
    program_id: 2,
    provider_id: '3c5f8ea6-1df4-47c2-b468-99d377486ea3',
  },
  {
    program_id: 3,
    provider_id: '3c5f8ea6-1df4-47c2-b468-99d377486ea3',
  },
  {
    program_id: 1,
    provider_id: '2d9f744c-b035-484f-9cc0-e9b718c9286c',
  },
  {
    program_id: 2,
    provider_id: '2d9f744c-b035-484f-9cc0-e9b718c9286c',
  },
  {
    program_id: 3,
    provider_id: '2d9f744c-b035-484f-9cc0-e9b718c9286c',
  },
];

exports.seed = function (knex) {
  return knex('program_providers').insert(program_providers);
};
