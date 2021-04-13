const programs = [
  {
    id: '49365015-1fea-4b56-a635-638388df5c64',
    name: 'Prevention',
    type: 'Prevention',
    description: 'This is the prevention program',
  },
  {
    id: 'ee313f99-22cf-4a1b-b073-3d6b5c625004',
    name: 'Sheltering',
    type: 'Sheltering',
    description: 'This is the sheltering program',
  },
  {
    id: '57cfa42d-77b8-46c4-a654-8c6222e9a669',
    name: 'Aftercare',
    type: 'Aftercare',
    description: 'This is the aftercare program',
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('programs')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('programs').insert(programs);
    });
};
