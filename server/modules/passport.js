const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const sageDB = require('./sageDB');

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = sageDB.getUser({ username });
    if (!user) {
      return done (null, false, { message: 'Incorrect username.' });
    }
    if (!user.validPassword(password)) {
      return (done, null, false, { message: 'Incorrect password.' })
    }
    return done(null, user);
  } catch (e) {
    return done(e);
  }
}));

module.exports = passport;
