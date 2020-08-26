const
  User          = require('mongoose').model('User'),
  generateToken = require('../auth/generate-token');


module.exports = async function (req, res, next) {
  const { username, passwordHash } = req.body;

  /* Verify username and passwordHash were provided in request body */
  if(!username || !passwordHash)
    return res.status(400).json({ error: 'Valid `username` and `passwordHash` required.' });

  /* Find user with this username, include passwordHash for comparison */
  const user = await User.findOne({ username }).select('+passwordHash');
  if(!user || user.passwordHash !== passwordHash)
    return res.status(400).json({ error: 'Incorrect username/password combination.' });

  /* username/password verified, return a signed token (JWT) */
  const token = generateToken(user);
  res.status(200).json({ token });
};
