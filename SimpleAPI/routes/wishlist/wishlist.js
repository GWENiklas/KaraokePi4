var wishlistService = require("./wishlistService.js");
var passport = require("../authService.js");
var wishlistController = function(app) {
    app.get('/wishlist', wishlistService.findAll);
    app.post('/wishlist', wishlistService.addWish);
    app.get('/wishlist/:id', wishlistService.findById);
    app.delete('/wishlist/:id', passport.authenticate('digest', { session: false }), wishlistService.removeWish);
};

module.exports = wishlistController;
