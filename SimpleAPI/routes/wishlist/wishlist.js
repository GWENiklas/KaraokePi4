var wishlistService = require("./wishlistService.js");
var wishlistController = function(app) {
    app.get('/wishlist', wishlistService.findAll);
    app.post('/wishlist', wishlistService.addWish);
    app.get('/wishlist/:id', wishlistService.findById);
    app.delete('/wishlist/:id', wishlistService.removeWish);
};

module.exports = wishlistController;
