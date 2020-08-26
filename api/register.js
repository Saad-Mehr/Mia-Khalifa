const mongoose = require('mongoose');
const User = mongoose.model('User');


module.exports = async function (req, res, next) {
  const { username, nickname, passwordHash } = req.body;

  /* Check for valid username/password input */
  if(!username || !nickname || !passwordHash)
    return res.status(400).json({ error: 'Valid username, nickname, passwordHash required.' });

  if(!username.match('^[a-zA-Z][a-zA-Z0-9]{3,15}$'))
    return res.status(400).json({ error: 'Username must be between 4 and 16 characters.' });

  /* Make sure a user with this username does not yet exist */
  const exists = await User.findOne({ username });
  if(exists)
    return res.status(400).json({ error: 'User already exists.' });

  /* Create the user */
  const user = new User({ username, nickname, passwordHash });
  await user.save();

  /* Return with success */
  res.status(200).json({ success: true });
};
