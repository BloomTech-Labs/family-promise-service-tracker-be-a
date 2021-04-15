const programs = [
  {
    name: 'Prevention',
    type: 'Prevention',
    description: 'This is the prevention program',
  },
  {
    name: 'Sheltering',
    type: 'Sheltering',
    description: 'This is the sheltering program',
  },
  {
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
