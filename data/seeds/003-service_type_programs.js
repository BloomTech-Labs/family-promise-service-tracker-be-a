const service_type_programs = [
  {
    program_id: 1,
    service_type_id: 1,
  },
];

exports.seed = function (knex) {
  return knex('service_type_programs').insert(service_type_programs);
};
