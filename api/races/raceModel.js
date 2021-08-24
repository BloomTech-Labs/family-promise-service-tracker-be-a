const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('races');
};

const findById = async (id) => {
  return await knex('races').where('race_id', id).first();
  // keeping these for now as a reference
  // .select(knex.raw('races.*, to_json(locations.*) as location'))
  // .groupBy('races.race_id', 'locations.location_id');
};

const createRace = async (newRace) => {
  return await knex('races').insert(newRace, ['*']);
};

const updateRace = async (id, race) => {
  return await knex('races').where('race_id', id).update(race);
};

const removeRace = async (id) => {
  return await knex('races').where('race_id', id).del();
};

module.exports = {
  findAll,
  findById,
  createRace,
  updateRace,
  removeRace,
};
