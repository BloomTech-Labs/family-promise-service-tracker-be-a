const statuses = [
  {
    name: 'Complete',
  },
  {
    name: 'In Progress',
  },
  {
    name: 'Needs Followup',
  },
  {
    name: 'Not Started',
  },
];

exports.seed = function (knex) {
  return knex('statuses').insert(statuses);
};
