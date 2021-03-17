//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const port = 3000;
const app = express();
const mongoose = require('mongoose');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser:true});

const userSchema = {
  email: String,
  password: String
};

const User = new mongoose.model('User', userSchema);

app.get('/', (req,res) => {
  res.render ('home');
});

app.get('/login', (req,res) => {
  res.render ('login');
});


app.get('/register', (req,res) => {
  res.render ('register');
});


app.post('/register', (req,res) => {
  const newUser = new User ({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save((err) => {
    if(err) {
      console.log(err);
    }else{
      res.render('secrets');
    }
  });
});


app.post('/login', (req,res) => {
  User.findOne({email:req.body.username}, (err, foundUser) => {
    if (!err){
      if(foundUser){
        if(foundUser.password === req.body.password) {
          res.render('secrets');
        }else{
          res.send('<h1> Wrong password </h1>');
        }
      }else{
        res.send(`no user found with name ${req.body.username}`);
      }
    }
  });
});
















app.listen(port, () => {
  console.log(`listening on port ${port}.`);
});
