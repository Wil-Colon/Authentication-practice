//jshint esversion:8
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const User = new mongoose.Schema({
  email: String,
  password: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
