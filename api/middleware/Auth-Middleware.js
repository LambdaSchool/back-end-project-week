const User = require('../models/UserModels');
const LocalStrategy = require('passport-local');
const PassportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");

const ExtractJwt = PassportJWT.ExtractJwt;
const JwtStrategy = PassportJWT.Strategy;
const secret = process.env.SECRET;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const localStrategy = new LocalStrategy((username, password, done) => {
  console.log('this')
  User.findOne({ username })
    .then(user => {
      //might need to add if to check if user was found
      console.log("pplocal",user)
      user.checkPassword(password)
        .then(valid => {
          if(valid){
            console.log("pplocal checkpassworkd",valid)
            const {_id, username } = user;
            return done(null, { _id, username });
          } else {
            return done(null, false);
          }
        })
        .catch(err => {
          return done(err)
        })
    })
    .catch(err => {
      return done(err)
    })
});

const ppJwt = new JwtStrategy(jwtOptions, (payload, done) => {
  console.log("ppJwt payload", payload);
  User.findById(payload.sub)
    .then(user => {
      console.log("ppJwt user",user)
      if(user) {
        done(null, user)
      } else {
        done(null, false);
      }
    })
    .catch(err => {
      done(err)
    })
})

const letsMakeAToken = user => {
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username
  };
  const options = {
    expiresIn: '5m'
  };
  return jwt.sign(payload, secret, options)
}

module.exports = {
  localStrategy,
  ppJwt,
  letsMakeAToken
}