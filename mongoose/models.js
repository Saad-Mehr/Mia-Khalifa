const
  mongoose     = require('mongoose'),
  { ObjectId } = mongoose.Schema.Types;


mongoose.model('User', {
  username: { unique: true, type: String },
  nickname: String,
  profilePicture: String,
  passwordHash: { select: false, type: String }
});

mongoose.model('Message', {
  from: { ref: 'User', type: ObjectId },
  to: { ref: 'User', type: ObjectId },
  text: String,
  date: Date
});

mongoose.model('ActiveConversation', {
  user: { ref: 'User', type: ObjectId },
  recipient: { ref: 'User', type: ObjectId }
});
