const { AuthenticationService, AuthenticationBaseStrategy, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');

const axios = require('axios');
const { OAuthStrategy } = require('@feathersjs/authentication-oauth');

class GoogleStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    const baseData = await super.getEntityData(profile);
    // this will grab the picture and email address of the Google profile
    return {
      ...baseData,
      email: profile.email
    };
  }
}

class Auth0Strategy extends OAuthStrategy {
  async getEntityData(profile) {
    const baseData = await super.getEntityData(profile);

    return {
      ...baseData,
      email: profile.email
    };
  }
}

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('google', new GoogleStrategy());
  authentication.register('auth0', new Auth0Strategy());
  
  app.use('/authentication', authentication);
  app.configure(expressOauth());
};