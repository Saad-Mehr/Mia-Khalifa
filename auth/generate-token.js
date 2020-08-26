const
  jwt      = require('jsonwebtoken'),
  jwkToPem = require('jwk-to-pem'),
  {JSON_WEB_KEY, PRODUCTION_URL} = require('../env');

const PrivateKey = jwkToPem(JSON_WEB_KEY, { private: true });


module.exports = function generateToken (user) {

  const payload = {
    _id: user._id
  };

  return jwt.sign(payload, PrivateKey, {
    algorithm: 'RS256',
    expiresIn: '2 days',
    audience: 'pigeon-webapp',
    issuer: PRODUCTION_URL,
    keyid: JSON_WEB_KEY.kid,
  });
};
