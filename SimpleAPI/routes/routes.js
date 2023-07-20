var songsController = require("./songs/songs.js");
var playersController = require("./players/players.js");
var wishlistController = require("./wishlist/wishlist.js");
var settingsController  = require('./settings/settings.js');
var shutdownController = require('./shutdown/shutdown.js');
var uploadController = require('./upload/upload.js');
var adminController = require('./admin/admin.js');
var appRouter = function(app) {
    songsController(app);
    playersController(app);
    wishlistController(app);
    settingsController(app);
    shutdownController(app);
    uploadController(app);
    adminController(app);
};

module.exports = appRouter;
