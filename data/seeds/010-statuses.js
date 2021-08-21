const statuses = [
  {
    status: 'Not Started',
  },
  {
    status: 'In Progress',
  },
  {
    status: 'Needs Follow-Up',
  },
  {
    status: 'Completed',
  },
];

exports.seed = function (knex) {
  return knex('statuses').insert(statuses);
};
