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

  if (providerArray.length === 0) {
    throw new Error(`Provider with id ${id} not found`);
  }

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
  return finalArray[0];
};

const update = async (id, change) => {
  const old = await findById(id);
  if (old.programs !== change.programs) {
    // Program has been deleted
    for (const i in old.programs) {
      if (!change.programs.includes(old.programs[i])) {
        const programObj = await knex('programs as p')
          .where({ 'p.program_name': old.programs[i] })
          .select('program_id')
          .first();
        const program_id = programObj.program_id;
        await knex('provider_programs as pp')
          .where({ 'pp.program_id': program_id })
          .andWhere({ 'pp.provider_id': id })
          .del();
      }
    }
    // Program has been added
    for (const i in change.programs) {
      if (!old.programs.includes(change.programs[i])) {
        const programObj = await knex('programs as p')
          .where({ 'p.program_name': change.programs[i] })
          .select('program_id')
          .first();
        const program_id = programObj.program_id;
        await knex('provider_programs').insert({
          program_id: program_id,
          provider_id: id,
        });
      }
    }
  }
  const providerRoleObj = await knex('provider_roles')
    .where({ provider_role: change.provider_role })
    .select('provider_role_id')
    .first();
  const providerRoleId = providerRoleObj.provider_role_id;
  let { programs, provider_role, ...rest } = change;
  const insertObj = {
    ...rest,
    provider_role_id: providerRoleId,
    updated_at: knex.fn.now(),
  };
  await knex('providers').where({ provider_id: id }).update(insertObj);
  return await findById(id);
};

const removeProvider = async (id) => {
  const userObj = await findById(id);
  if (userObj.provider_is_active === false) {
    throw new Error(`Provider with id ${id} is already deleted`);
  }
  const updated = await knex('providers as p')
    .where('provider_id', id)
    .update({ provider_is_active: false });
  if (updated > 0) {
    return userObj;
  }
};

module.exports = {
  findAll,
  findById,
  update,
  removeProvider,
};
