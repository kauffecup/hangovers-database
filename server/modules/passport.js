const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const sageDB = require('./sageDB');

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await sageDB.getUser({ username });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return done(null, false, { message: 'Incorrect password.' })
    }
    return done(null, user);
  } catch (e) {
    return done(e);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await sageDB.getUserById(id);
    return done(null, user);
  } catch (e) {
    return done(e);
  }
});

module.exports = passport;
