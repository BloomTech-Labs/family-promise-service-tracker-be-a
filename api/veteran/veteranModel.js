const db = require('../../data/db-config');

module.exports = {
  findAll
}

const findAll = async () => {
  return await db('recipients')
    .select(
      'recipient_id',
      'recipient_first_name',
      'recipient_middle_name',
      'recipient_last_name',
      'recipient_date_of_birth',
      'recipient_veteran_status'
    )
    .where({'recipient_veteran_status': true})
}