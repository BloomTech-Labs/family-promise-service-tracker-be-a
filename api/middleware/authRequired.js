const createError = require('http-errors');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const { oktaVerifierConfig, okta } = require('../../config/okta');
const Providers = require('../provider/providerModel');
const oktaJwtVerifier = new OktaJwtVerifier(oktaVerifierConfig.config);

const makeProfileObj = async (id) => {
  try {
    const oktaUser = await okta.getUser(id);

    return {
      provider_id: id,
      provider_email: oktaUser.profile.email,
      provider_first_name: oktaUser.profile.firstName,
      provider_last_name: oktaUser.profile.lastName,
      provider_avatar_url: `https://avatars.dicebear.com/api/initials/${oktaUser.profile.firstName}%20${oktaUser.profile.lastName}.svg`,
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
    const profile = await Providers.findById(verify.claims.sub);
    if (profile) {
      req.profile = profile;
    } else {
      // if profile doesn't already exist, create one
      const providerObj = await makeProfileObj(verify.claims.sub);
      const newProvider = await Providers.create(providerObj);
      req.profile = await Providers.findById(newProvider[0].provider_id);
    }
    next();
  } catch (err) {
    next(createError(401, err.message));
  }
};

module.exports = authRequired;
