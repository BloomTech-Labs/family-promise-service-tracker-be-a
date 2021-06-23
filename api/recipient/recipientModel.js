const knex = require('../../data/db-config');

const findAll = (filter = {}) => {
  return knex('recipients as r')
    .leftJoin('households as h', 'r.household_id', 'h.household_id')
    .leftJoin('genders as g', 'r.gender_id', 'g.gender_id')
    .leftJoin('ethnicities as e', 'r.ethnicity_id', 'e.ethnicity_id')
    .leftJoin('races as ra', 'r.race_id', 'ra.race_id')
    .leftJoin('locations as l', 'h.location_id', 'l.location_id')
    .select(
      'r.*',
      'ra.race',
      'g.gender',
      'e.ethnicity',
      'h.household_name',
      'l.zip'
    )
    .where(filter);
};

const create = async (recipients) => {
  let newRecipientsId;
  try {
    await knex.transaction(async (trx) => {
      const createdRecipients = await trx('recipients')
        .insert([
          { recipient_first_name: recipients.recipient_first_name },
          { recipient_middle_name: recipients.recipient_middle_name },
          { recipient_last_name: recipients.recipient_last_name },
          { recipient_date_of_birth: recipients.recipient_date_of_birth },
          { recipient_veteran_status: recipients.recipient_veteran_status },
        ])
        .returning('*');

      newRecipientsId = createdRecipients[0].recipient_id;
    });

    return findById(newRecipientsId);
  } catch (err) {
    throw new Error(err);
  }
};

const findById = (id) => {
  return findAll({ 'r.recipient_id': id }).first();
};

module.exports = {
  findAll,
  create,
  findById,
};
