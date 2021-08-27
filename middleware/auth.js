const jwt= require('jsonwebtoken')
const passport= require('passport')
const ExtractJwt=require('passport-jwt').ExtractJwt

const User= require('../models/user-model')
const JwtStrategy = require("passport-jwt").Strategy
const keys = require('../config/keys');

const opts= {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt.JWT_SECRET
};

passport.use(
  "userStrategy",
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      console.log('nkfdfk')
      const user= await User.findById(jwtPayload.id);
      console.log('bye',user.username)
      done(user,null);
    } catch (error) {      
      done(null, false);
    }
  })
);

const generateJwtToken = (payload)=> {
  const token= jwt.sign(payload, opts.secretOrKey);
  return token;
};

module.exports= generateJwtToken;