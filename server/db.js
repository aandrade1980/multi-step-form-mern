const mongoose = require('mongoose');

const MONGO_URL =
  process.env.MONGO_URL ||
  'mongodb+srv://admin:Password.123@cluster0.pfc6u.mongodb.net/form-user?retryWrites=true&w=majority';

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
