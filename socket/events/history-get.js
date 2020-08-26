const
{ sendEvent } = require('../connections'),
  Message     = require('mongoose').model('Message');


module.exports = async function (src, { target }) {

  /* Query for all messages between the two */
  const messages = await Message
    .find()
    .or([
      { from: src, to: target },
      { from: target, to: src }
    ])
    .sort('+date')
    .limit(25)
    .lean();

  sendEvent('HISTORY_GET', src, { target, messages });

};
