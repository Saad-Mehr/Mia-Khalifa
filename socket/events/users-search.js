const
{ sendEvent } = require('../connections'),
  User        = require('mongoose').model('User');


module.exports = async function (src, { username }) {
  if(username.length === 0)
    return sendEvent('USERS_SEARCH', src, { users: [] });

  const users = await User
    .find({ username: new RegExp(`^${username}`, 'i') })
    .select('username nickname')
    .limit(20)
    .lean();

  sendEvent('USERS_SEARCH', src, { username, users });

};
