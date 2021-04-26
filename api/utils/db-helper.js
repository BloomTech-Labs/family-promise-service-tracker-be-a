const knex = require('../../data/db-config');

const findAll = async (table) => {
  return await knex(table);
};

const findBy = (table, filter) => {
  return knex(table).where(filter);
};

const findById = async (table, id) => {
  return knex(table).where({ id }).first().select('*');
};

const create = async (table, object) => {
  return knex(table).insert(object).returning('*');
};

const update = (table, id, object) => {
  return knex(table).where({ id: id }).first().update(object).returning('*');
};

const remove = async (table, id) => {
  return await knex(table).where({ id }).del();
};

module.exports = {
  knex,
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
};
