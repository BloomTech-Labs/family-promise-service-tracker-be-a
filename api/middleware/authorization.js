const createError = require('http-errors');
const { isAssignedToProgram, getProgramFromServiceType } = require('./models');

const requireAdmin = (req, res, next) => {
  if (req.profile.role == 'administrator') {
    next();
  } else {
    next(createError(401, 'User not authorized to perform this action'));
  }
};

const canCrudServiceType = async (req, res, next) => {
  // admins can always create service types
  if (req.profile.role == 'administrator') {
    next();

    // program managers can only create service types for
    // programs they are associated with
  } else if (req.profile.role == 'program_manager') {
    try {
      // if this is create, the program is in req body
      // otherwise need to look up the service_type to
      // get the program id
      const program = req.body.program_id
        ? [req.body.program_id]
        : getProgramFromServiceType(req.params.id);

      const canCrud = await isAssignedToProgram(req.profile, program[0]);
      canCrud
        ? next()
        : next(
            createError(
              401,
              'User not authorized to update services on this program'
            )
          );
      // since multiple areas could fail here, pass it along directly
    } catch (err) {
      next(createError(500, err));
    }
  } else {
    // no other user role can create or edit service types
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
  canCrudServiceType,
  isAssignedToProgram,
};
