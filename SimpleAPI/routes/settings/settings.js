var wishlistService = require("./settingsService.js");
var wishlistController = function(app) {
    app.get('/settings', wishlistService.getSettings);
    app.post('/settings/toggle/wishlist', wishlistService.toggleWishlist)
};

module.exports = wishlistController;
