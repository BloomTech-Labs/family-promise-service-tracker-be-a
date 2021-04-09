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
      // adminstrators can edit anyone's Name, Avatar, Role, but no other info
      (req.profile.role == 'administrator') &
      !req.body.id &
      !req.body.email
    ) {
      next();
    } else if (
      // users can edit their own Name and Avatar, but no other info
      (req.profile.id == req.params.id) &
      !req.body.id &
      !req.body.email &
      !req.body.role
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
