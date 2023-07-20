var passport = require('passport')
var DigestStrategy = require('passport-http').DigestStrategy;
var fs = require('fs');

var users = JSON.parse(fs.readFileSync('./admins.json', 'utf8'));

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

