const oktaClient = require('@okta/okta-sdk-nodejs');

const okta = new oktaClient.Client({
  orgUrl: process.env.OKTA_ORG_URL,
  token: process.env.OKTA_API_TOKEN,
});

const oktaVerifierConfig = {
  expectedAudience: ['api://default', `${process.env.OKTA_CLIENT_ID}`],
  config: {
    issuer: `${process.env.OKTA_URL_ISSUER}`,
    clientId: `${process.env.OKTA_CLIENT_ID}`,
    assertClaims: {
      aud: `${process.env.OKTA_CLIENT_ID}`,
    },
  },
};

module.exports = {
  okta,
  oktaVerifierConfig,
};
