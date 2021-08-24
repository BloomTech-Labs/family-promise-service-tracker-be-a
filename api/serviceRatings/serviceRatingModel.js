const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('service_ratings');
};

const findById = async (id) => {
  return await knex('service_ratings').where('service_rating_id', id).first();
  // keeping these for now as a reference
  // .select(knex.raw('service_ratings.*, to_json(locations.*) as location'))
  // .groupBy('service_ratings.service_rating_id', 'locations.location_id');
};

const createServiceRating = async (newServiceRating) => {
  return await knex('service_ratings').insert(newServiceRating, ['*']);
};

const updateServiceRating = async (id, serviceRatings) => {
  return await knex('service_ratings')
    .where('service_rating_id', id)
    .update(serviceRatings);
};

const removeServiceRating = async (id) => {
  return await knex('service_ratings').where('service_rating_id', id).del();
};

module.exports = {
  findAll,
  findById,
  createServiceRating,
  updateServiceRating,
  removeServiceRating,
};
