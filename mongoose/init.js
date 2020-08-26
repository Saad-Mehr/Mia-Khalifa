const
  mongoose      = require('mongoose'),
  {MONGODB_URL} = require('../env');


mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Connected to Mongoose.');
});
mongoose.connection.on('error', err => {
  console.error('Error connecting to Mongoose:', err);
});
