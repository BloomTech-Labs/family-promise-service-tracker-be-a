const DB = require('../utils/db-helper');

const findOrCreateProfile = async (profileObj) => {
  const foundProfile = await DB.findById('profiles', profileObj.id).then(
    (profile) => profile
  );
  if (foundProfile) {
    return foundProfile;
  } else {
    // create temp avaturl with initials of name
    profileObj = {
      ...profileObj,
      avatarUrl: `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
        profileObj.name
      )}.svg`,
    };
    return await DB.create('profiles', profileObj).then((newProfile) => {
      return newProfile ? newProfile[0] : newProfile;
    });
  }
};

module.exports = {
  findOrCreateProfile,
};
