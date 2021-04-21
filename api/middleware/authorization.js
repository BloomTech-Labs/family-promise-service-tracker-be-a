const createError = require('http-errors');
const knex = require('../../data/db-config');

const isAssignedToProgram = async (profile, program) => {
  const programs = await knex('programs_users')
    .select('program_id')
    .where({ profile_id: profile.id });

  return programs.map((p) => p.program_id).includes(program);
};

const requireAdmin = (req, res, next) => {
  if (req.profile.role == 'administrator') {
    next();
  } else {
    next(createError(401, 'User not authorized to perform this action'));
  }
};

const canCreateServiceType = async (req, res, next) => {
  if (req.profile.role == 'administrator') {
    next();
  } else if (req.profile.role == 'program_manager') {
    try {
      const canCrud = await isAssignedToProgram(
        req.profile,
        req.body.program_id
      );
      canCrud
        ? next()
        : next(
            createError(
              401,
              'User not authorized to update services on this program'
            )
          );
    } catch (err) {
      throw new Error(err);
    }
  } else {
    next(
      createError(
        401,
        'Service providers not authorized to perform this action'
      )
    );
  }
};

const canEditProfile = async (req, res, next) => {
  try {
    if (
      // administrators cannot edit profile id or email
      // but can edit any other fields
      (req.profile.role == 'administrator') &
      !req.body.id &
      !req.body.email
    ) {
      next();
    } else if (
      // users can only edit their own Name and Avatar
      (req.profile.id == req.params.id) &
      !req.body.id &
      !req.body.email &
      !req.body.role &
      !req.body.programs
    ) {
      next();
    } else {
      throw new Error('User not authorized to make this update');
    }
  } catch (err) {
    next(createError(401, err.message));
  }
};

module.exports = {
  requireAdmin,
  canEditProfile,
  canCreateServiceType,
};
