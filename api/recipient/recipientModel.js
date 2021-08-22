const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('recipients');
};

const findById = async (id) => {
  return await knex('recipients').where('recipient_id', id).first();
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

const deleteRecipient = (id) => {
  return knex('recipients').where('recipient_id', id).del();
};

module.exports = {
  findAll,
  findById,
  create,
  deleteRecipient,
};
