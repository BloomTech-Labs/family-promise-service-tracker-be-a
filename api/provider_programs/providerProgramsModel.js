const knex = require('../../data/db-config');

const findAll = async () => {
  const providerArray = await knex('providers as p')
    .leftJoin(
      'provider_roles as pr',
      'p.provider_role_id',
      'pr.provider_role_id'
    )
    .leftJoin('provider_programs as pp', 'p.provider_id', 'pp.provider_id')
    .leftJoin('programs as pg', 'pp.program_id', 'pg.program_id')
    .select('p.*', 'pr.provider_role', 'pg.program_name');

  const idArray = [];
  const finalArray = [];
  providerArray.forEach((obj) => {
    const { program_name, ...newObj } = obj;
    if (!idArray.includes(obj.provider_id)) {
      idArray.push(obj.provider_id);
      program_name
        ? (newObj.programs = [program_name])
        : (newObj.programs = []);
      finalArray.push(newObj);
    } else {
      const targetObj = finalArray.find(
        (provider) => obj.provider_id === provider.provider_id
      );
      targetObj.programs.push(obj.program_name);
    }
  });
  return finalArray;
};

const findById = async (id) => {
  const providerArray = await knex('providers as p')
    .leftJoin(
      'provider_roles as pr',
      'p.provider_role_id',
      'pr.provider_role_id'
    )
    .leftJoin('provider_programs as pp', 'p.provider_id', 'pp.provider_id')
    .leftJoin('programs as pg', 'pp.program_id', 'pg.program_id')
    .select('p.*', 'pr.provider_role', 'pg.program_name')
    .where({ 'p.provider_id': id });

  const idArray = [];
  const finalArray = [];
  providerArray.forEach((obj) => {
    const { program_name, ...newObj } = obj;
    if (!idArray.includes(obj.provider_id)) {
      idArray.push(obj.provider_id);
      program_name
        ? (newObj.programs = [program_name])
        : (newObj.programs = []);
      finalArray.push(newObj);
    } else {
      const targetObj = finalArray.find(
        (provider) => obj.provider_id === provider.provider_id
      );
      targetObj.programs.push(obj.program_name);
    }
  });
  return finalArray;
};

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
  findById,
};
