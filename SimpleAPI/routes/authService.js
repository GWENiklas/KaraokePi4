var passport = require('passport')
var DigestStrategy = require('passport-http').DigestStrategy;

var users = [
  { id: 1, username: 'admin', password: 'karaoke123', realm: 'Admin' },
  { id: 2, username: 'admin2', password: 'karaoke123', realm: 'Admin' }
];

passport.use(new DigestStrategy({ qop: 'auth' },
  (username, done) => {
    const user = users.find(user => user.username === username);
    if (!user) {
      return done(null, false);
    }
    return done(null, user, user.password);
  },
  (params, done) => {
    // Validate the nonce, opaque, and other parameters here if needed
    done(null, true);
  }
));

module.exports = passport;

