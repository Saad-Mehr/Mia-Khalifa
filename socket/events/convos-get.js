const
{ sendEvent }  = require('../connections'),
  Conversation = require('mongoose').model('ActiveConversation');


module.exports = async function (src) {

  const convos = await Conversation
    .find({ user: src })
    .populate('recipient')
    .lean();

  sendEvent('CONVOS_GET', src, { user: src, convos });

};
