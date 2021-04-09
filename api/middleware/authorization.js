const createError = require('http-errors');

const canEditProfile = async (req, res, next) => {
  try {
    if (req.profile.role == 'administrator') {
      next();
    } else if (
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
  canEditProfile,
};
