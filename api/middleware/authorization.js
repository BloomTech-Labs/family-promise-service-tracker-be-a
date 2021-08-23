const createError = require('http-errors');
const { isAssignedToProgram, getProgramFromServiceType } = require('./models');

// Requires role of admin to apply
const requireAdmin = (req, res, next) => {
  if (req.profile.provider_role_id == 1) {
    next();
  } else {
    next(createError(401, 'User not authorized to perform this action'));
  }
};

// Requires role of program_manager to apply
const requireProgramManager = (req, res, next) => {
  if (req.profile.provider_role_id == 2) {
    next();
  } else {
    next(createError(401, 'User not authorized to perform this action'));
  }
};

const canCrudServiceType = async (req, res, next) => {
  // admins can always create service types
  if (req.profile.provider_role_id == 1) {
    next();

    // program managers can only create service types for
    // programs they are associated with
  } else if (req.profile.provider_role_id == 2) {
    try {
      // if this is create, the program is in req body
      // otherwise need to look up the service_type to
      // get the program id
      const program = req.body.program_id
        ? [req.body.program_id]
        : getProgramFromServiceType(req.params.id); // THIS NEEDS ATTENTION/FIXES

      const canCrud = await isAssignedToProgram(req.profile, program[0]); // THIS MAY NEED FIXES OR BE OUTDATED
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

// check to see if these still make sense, ie body.id, .email, .roles, .programs, etc
const canEditProfile = async (req, res, next) => {
  try {
    if (
      // administrators cannot edit profile id or email
      // but can edit any other fields
      (req.profile.provider_role_id == 1) &
      !req.body.id & // CHECK THIS .id
      !req.body.email
    ) {
      next();
    } else if (
      // users can only edit their own Name and Avatar
      (req.profile.id == req.params.id) & // CHECK THESE TWO .id
      !req.body.id & // CHECK THESE TWO .id
      !req.body.email &
      !req.body.provider_role_id &
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
  requireProgramManager,
  canEditProfile,
  canCrudServiceType,
  isAssignedToProgram,
};
