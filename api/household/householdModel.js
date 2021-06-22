const knex = require('../../data/db-config');

const create = async (households) => {
  let newHouseholdId;
  try {
    await knex.transaction(async (trx) => {
      const createdHousehold = await trx('households')
        .insert([
          { household_id: households.household_id },
          { location_id: households.location_id },
          { household_name: households.household_name },
          { household_size: households.household_size },
          { household_income: households.household_income },
        ])
        .returning('*');
      newHouseholdId = createdHousehold[0].household_id;
    });
    return await findById(newHouseholdId);
  } catch (err) {
    throw new Error(err);
  }
};

const findById = async (id) => {
  return await knex('households')
    .where({ 'households.household_id': id })
    .leftJoin('locations', {
      'households.household_id': 'locations.household_id',
    })
    .select(
      knex.raw(
      'households.*, to_json(locations.*) as location'
      )
    )
    .first()
    .groupBy(
      'households.household_id','locations.location_id'
    );
};

module.exports = {
  create,
  findById,
};
