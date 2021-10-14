const knex = require('../../data/db-config');

const findAll = async () => {
  const providerArray = await knex('providers as p')
    .join('provider_roles as pr', 'p.provider_role_id', 'pr.provider_role_id')
    .join('provider_programs as pp', 'p.provider_id', 'pp.provider_id')
    .join('programs as pg', 'pp.program_id', 'pg.program_id')
    .select('p.*', 'pr.provider_role', 'pg.program_name');
//   const dict = {};
//   providerArray.forEach((obj) => {
//     let shapedObj = {
//       provider_id: obj.provider_id,
//       provider_role_id: obj.provider_role_id,
//       employee_id: obj.employee_id,
//       provider_first_name: obj.provider_first_name,
//       provider_last_name: obj.provider_last_name,
//       provider_email: obj.provider_email,
//       provider_phone_number: obj.provider_phone_number,
//       provider_avatar_url: obj.provider_avatar_url,
//       provider_is_active: obj.provider_is_active,
//       created_at: obj.created_at,
//       updated_at: obj.updated_at,
//       provider_role: obj.provider_role,
//       programs: [obj.program_name],
//     };
//     if (!(obj.provider_id in dict)) {
//       dict[obj.provider_id] = shapedObj;
//     } else {
//       dict[obj.provider_id]['programs'].push(obj.program_name);
//     }
//   });
//   const result = [];
//   for (const key in dict) {
//     result.push(dict[key]);
//   }
//   return result;
// };
results = []
providerArray.forEach((obj) => {
  if (!results.includes(obj.provider_id)) {
    results.push(obj.provider_id);
  }else{

  }
});

// const findById = async (id) => {
//   return await knex('service_type_programs as stp')
//     .where('service_type_program_id', id)
//     .leftJoin('programs as p', 'p.program_id', 'stp.program_id')
//     .leftJoin(
//       'service_types as st',
//       'st.service_type_id',
//       'stp.service_type_id'
//     )
//     .select(
//       knex.raw(
//         'service_type_programs.*, to_json(programs.*) as program, to_json(service_types.*) as service_type'
//       )
//     )
//     .first()
//     .groupBy(
//       'stp.service_type_program_id',
//       'p.program_id',
//       'st.service_type_id'
//     );
// };

// // this will may be involved in a more complex machine, for when new service_types are created, and they need to be linked to a program(s)
// const createServiceTypeProgram = async (newServiceEntry) => {
//   return await knex('service_type_programs').insert(newServiceEntry, ['*']);
// };

// const updateServiceTypeProgram = (id, object) => {
//   return knex('service_type_programs')
//     .where({ service_type_program_id: id })
//     .update(object);
// };

// const removeServiceTypeProgram = (id) => {
//   return knex('service_type_programs')
//     .where('service_type_program_id', id)
//     .del();
// };

module.exports = {
  findAll,
};
