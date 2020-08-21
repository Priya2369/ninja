const express = require('express');
const mongoose = require('mongoose');
const authroutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://pass:78nncuhnC0Ncmce6@cluster0.baot7.mongodb.net/api?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authroutes);

//cookies 
app.get('/set-cookies', (req, res) => {
  //res.setHeader('set-cookie', 'newUser = true');
  res.cookie('newUser', false);
  res.cookie('isEmployee', true,{maxAge:1000 * 60 * 24, httpOnly: true});

  res.send('you got the cookie.......');
});

app.get('/read-cookies', (req, res) => {
const cookies = req.cookies;
console.log(cookies.newUser);
res.json(cookies)
});