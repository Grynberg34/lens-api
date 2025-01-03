const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('dotenv').config();
const User = require('./models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');

const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const redefineRouter = require('./routes/redefine');

const app = express();

// Express configs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


// Passport
app.use(passport.initialize());

// JWT Strategy

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_KEY;

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {

  User.findOne({where: {id: jwt_payload.id}})
  .then ( function(user) {
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
  .catch(function(err){
    console.log(err)
    res.redirect('/login')
  });

}));


// Google Strategy

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    scope: "profile"
  },
  function(accessToken, refreshToken, profile, done) {

  User.findOrCreate( {where: { google_id: profile.id }, 
    defaults : {
      nome: profile.displayName
    }
  })
  .then ( function(user) {
    if (user[0]) {
      return done(null, user[0]);
    } else {
      return done(null, false);
    }
  })
  .catch(function(err){
    console.log(err)
    res.redirect('/login')
  });
}
));

// Routes
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/redefine', redefineRouter);


// Error handling
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(err.statusCode).json({
      status : err.statusCode,
      message : "Error in JSON syntax"
    });
  }
    next();
});

app.use(function (err, req, res, next) {
  if (err.statusCode === 401) { 
    res.status(401).json({
      status : 401,
      message : "Not authorized"
    });
  }
  next();
});

app.use((req, res) => {
  res.status(404).json({
    status : 404,
    message : "Not found"
  })
});

// Listen to port 8080
var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('Listening on port', port);
});

module.exports = app;
