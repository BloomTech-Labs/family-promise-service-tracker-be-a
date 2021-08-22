const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('households');
};

const findById = async (id) => {
  // why not working??
  return await knex('households').where('household_id', id).first();
  // .leftJoin('locations', {
  //   'households.location_id': 'locations.location_id',
  // })
  // .select(knex.raw('households.*, to_json(locations.*) as location'))

  // .groupBy('households.household_id', 'locations.location_id');
};

const create = async (households) => {
  // Not Ready
  let newHouseholdId;
  try {
    await knex.transaction(async (trx) => {
      const createdHousehold = await trx('households')
        .insert([
          { household_id: households.household_id },
          { location_id: households.location_id },
          { household_name: households.household_name },
          { household_size: households.household_size },
          { household_income: households.household_monthly_income },
        ])
        .returning('*');
      newHouseholdId = createdHousehold[0].household_id;
    });
    return await findById(newHouseholdId);
  } catch (err) {
    throw new Error(err);
  }
};

const update = async (id, household) => {
  return id;
};

const remove = async (id) => {
  return id;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
