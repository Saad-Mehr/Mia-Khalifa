const
  jwt      = require('jsonwebtoken'),
  jwkToPem = require('jwk-to-pem'),
  {JSON_WEB_KEY, PRODUCTION_URL} = require('../env');

const PublicKey = jwkToPem(JSON_WEB_KEY);


module.exports = async function verifyToken (token) {
  try {

    /* Verify the token's signature, extract payload */
    const payload = await jwt.verify(token, PublicKey, {
      algorithms: [ 'RS256' ],
      issuer: PRODUCTION_URL,
      audience: 'pigeon-webapp',
    });

    /* Make sure payload is valid and contains _id */
    if(!payload || !payload._id)
      throw Error('Invalid payload');

    return payload;

  } catch(err) {

    throw Error(`Invalid token: ${err.message}`);

  }
};
