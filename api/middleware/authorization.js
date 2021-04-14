const createError = require('http-errors');

const requireAdmin = (req, res, next) => {
  if (req.profile.role == 'administrator') {
    next();
  } else {
    next(createError(401, 'User not authorized to perform this action'));
  }
};

const canEditProfile = async (req, res, next) => {
  try {
    if (
      // adminstrators cannot edit profile id or email
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
};
