const
{ sendEvent }  = require('../connections'),
  mongoose     = require('mongoose'),
  ObjectId     = mongoose.Types.ObjectId,
  Message      = mongoose.model('Message'),
  Conversation = mongoose.model('ActiveConversation');


module.exports = async function (src, { to, text }) {

  const message = {
    to  : to,
    from: src,
    text: text,
    date: new Date()
  };

  try {
    sendEvent('USER_MESSAGE', to, message);
  } catch(err){}

  Message.create(message);

  let convo = await Conversation
    .findOne({ user: to, recipient: src })
    .populate('recipient');

  if(!convo){

    convo = await Conversation.create({ user: to, recipient: src });

    console.log(convo);

    sendEvent('CONVO_OPEN', to, userInfo);

  }

};
