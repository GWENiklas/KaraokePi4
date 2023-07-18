var wishlistService = require("./settingsService.js");
var passport = require("../authService.js");
var wishlistController = function(app) {
    app.get('/settings', wishlistService.getSettings);
    app.post('/settings/toggle/wishlist', passport.authenticate('digest', { session: false }), wishlistService.toggleWishlist)
};

module.exports = wishlistController;
