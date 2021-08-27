const express = require('express');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./config/passport-setup');
const mongoose = require('mongoose');
const User= require('./models/user-model');
const Task= require('./models/task');
const authRoutes = require('./routes/auth-routes');
const bodyParser = require('body-parser')

const app = express();


var http = require('http');

app.set('view engine', 'ejs');
// app.use(express.json())

var jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({ extended: false }))

//configure session storage
app.use(cookieSession({
  name: 'session-name',
  keys: [keys.session.cookieKey]
}))

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to mongodb');
});

//configure passportjs
app.use(passport.initialize());
app.use(passport.session());

//load routes
app.use('/', require('./routes/auth-routes'))
app.use('/profile', require('./routes/profile-routes'))

app.listen(process.env.PORT || 3000, () => console.log('App listening on port 3000'))