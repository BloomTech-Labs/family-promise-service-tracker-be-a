const DB = require('../utils/db-helper');

const findOrCreateProfile = async (profileObj) => {
  const foundProfile = await DB.findById('profiles', profileObj.id).then(
    (profile) => profile
  );
  if (foundProfile) {
    return foundProfile;
  } else {
    return await DB.create('profiles', profileObj).then((newProfile) => {
      return newProfile ? newProfile[0] : newProfile;
    });
  }
};

module.exports = {
  findOrCreateProfile,
};
