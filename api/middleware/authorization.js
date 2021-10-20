const createError = require('http-errors');
const knex = require('../../data/db-config');
const {
  isAssignedToProgram,
  getServiceTypeProgramIds,
  getProviderProgramIds,
} = require('./authMiddlewareUtil');

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

const canCrudProgram = async (req, res, next) => {
  // admins can always create service types
  if (req.profile.provider_role_id == 1) {
    next();
  } else if (req.profile.provider_role_id == 2) {
    if (req.method == 'POST') {
      next();
    } else {
      const providerId = req.profile.provider_id;
      const programId = req.params.id;
      const providerToProgram = await isAssignedToProgram(
        providerId,
        programId
      );
      providerToProgram
        ? next()
        : next(
            createError(
              401,
              'This user is not authorized to perform this action'
            )
          );
    }
  } else {
    // no other user role can create or edit service types
    next(
      createError(401, 'This user is not authorized to perform this action')
    );
  }
};

const canCrudServiceType = async (req, res, next) => {
  // admins can always create service types
  if (req.profile.provider_role_id == 1) {
    next();

    // program managers can only create service types for
    // programs they are associated with
  } else if (req.profile.provider_role_id == 2) {
    //provider id from profile
    const providerId = req.profile.provider_id;
    let providerProgramIds = await getProviderProgramIds(providerId);
    let serviceTypeProgramIds = [];
    if (req.body.program_id) {
      //post will have program id
      serviceTypeProgramIds = req.body.program_id;
    } else {
      //put will have service type id in params
      serviceTypeProgramIds = await getServiceTypeProgramIds(req.params.id);
    }

    const notAssociated = [];
    serviceTypeProgramIds
      ? serviceTypeProgramIds.map((programId) => {
          if (!providerProgramIds.includes(programId)) {
            notAssociated.push(programId);
          }
        })
      : next(createError(400, 'User is not associated to any programs!'));

    //if not associated then return sophisticated error string
    if (notAssociated.length > 0) {
      let errorStr = '';
      for await (let noAss of notAssociated) {
        const programObj = await knex('programs')
          .where('program_id', noAss)
          .first();
        const name = programObj.program_name;
        errorStr += `[${noAss}: ${name}], `;
      }
      errorStr = errorStr.slice(0, -2);
      next(
        createError(
          401,
          `User ${providerId} is not connected with programs: ${errorStr}`
        )
      );
    }
    next();
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
  canCrudProgram,
};
