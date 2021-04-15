const createError = require('http-errors');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const { oktaVerifierConfig, okta } = require('../../config/okta');
const Profiles = require('../profile/profileModel');
const DB = require('../utils/db-helper');
const oktaJwtVerifier = new OktaJwtVerifier(oktaVerifierConfig.config);

const makeProfileObj = async (id) => {
  try {
    const oktaUser = await okta.getUser(id);

    return {
      id: id,
      email: oktaUser.profile.email,
      firstName: oktaUser.profile.firstName,
      lastName: oktaUser.profile.lastName,
      avatarUrl: `https://avatars.dicebear.com/api/initials/${oktaUser.profile.firstName}%20${oktaUser.profile.lastName}.svg`,
    };
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * A simple middleware that asserts valid Okta idToken and sends 401 responses
 * if the token is not present or fails validation. If the token is valid,
 * it looks to see if there is already a user in the DB, and if not, creates one.
 * Return the full profile object in req.profile to pass along to client as needed.
 */
const authRequired = async (req, res, next) => {
  try {
    // make sure token exists
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) throw new Error('Missing idToken');
    const idToken = match[1];
    // verify it is valid with Okta
    const verify = await oktaJwtVerifier.verifyAccessToken(
      idToken,
      oktaVerifierConfig.expectedAudience
    );
    // if valid, check if user profile already exists
    const profile = await Profiles.findById(verify.claims.sub);
    if (profile) {
      req.profile = profile;
    } else {
      // if profile doesn't already exist, create one
      const profileObj = await makeProfileObj(verify.claims.sub);
      const newProfile = await DB.create('profiles', profileObj);
      req.profile = await Profiles.findById(newProfile[0].id);
    }
    next();
  } catch (err) {
    next(createError(401, err.message));
  }
};

module.exports = authRequired;
