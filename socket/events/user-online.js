const
{ sendEvent }  = require('../connections'),
  mongoose     = require('mongoose'),
  Conversation = mongoose.model('ActiveConversation');


module.exports = async function (src) {

  const convos = await Conversation
    .find({ recipient: src })
    .populate('user')
    .select('_id');

  console.log(convos);

};
module.exports = async function (src) {
}
