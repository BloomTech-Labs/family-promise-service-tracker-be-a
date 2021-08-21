const service_type_programs = [
  {
    program_id: 1,
    service_type_id: 1,
  },
  {
    program_id: 1,
    service_type_id: 2,
  },
  {
    program_id: 1,
    service_type_id: 3,
  },
  {
    program_id: 1,
    service_type_id: 5,
  },
  {
    program_id: 1,
    service_type_id: 6,
  },
  {
    program_id: 1,
    service_type_id: 8,
  },
  {
    program_id: 1,
    service_type_id: 9,
  },
  {
    program_id: 1,
    service_type_id: 11,
  },
  {
    program_id: 1,
    service_type_id: 12,
  },
  {
    program_id: 1,
    service_type_id: 13,
  },
  {
    program_id: 2,
    service_type_id: 3,
  },
  {
    program_id: 2,
    service_type_id: 5,
  },
  {
    program_id: 2,
    service_type_id: 6,
  },
  {
    program_id: 2,
    service_type_id: 7,
  },
  {
    program_id: 2,
    service_type_id: 8,
  },
  {
    program_id: 2,
    service_type_id: 9,
  },
  {
    program_id: 2,
    service_type_id: 10,
  },
  {
    program_id: 2,
    service_type_id: 12,
  },
  {
    program_id: 2,
    service_type_id: 13,
  },
  {
    program_id: 3,
    service_type_id: 3,
  },
  {
    program_id: 3,
    service_type_id: 4,
  },
  {
    program_id: 3,
    service_type_id: 5,
  },
  {
    program_id: 3,
    service_type_id: 6,
  },
  {
    program_id: 3,
    service_type_id: 7,
  },
  {
    program_id: 3,
    service_type_id: 8,
  },
  {
    program_id: 3,
    service_type_id: 9,
  },
  {
    program_id: 3,
    service_type_id: 12,
  },
  {
    program_id: 3,
    service_type_id: 13,
  },
];

const seed = function (knex) {
  return knex('service_type_programs').insert(service_type_programs);
};

module.exports = {
  service_type_programs,
  seed,
};
