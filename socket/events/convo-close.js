const
{ sendEvent }  = require('../connections'),
  Conversation = require('mongoose').model('ActiveConversation');


module.exports = async function (src, { recipient }) {

  await Conversation.findOneAndRemove({
    user: src,
    recipient: recipient
  });

};
