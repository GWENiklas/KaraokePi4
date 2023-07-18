var songsController = require("./songs/songs.js");
var playersController = require("./players/players.js");
var wishlistController = require("./wishlist/wishlist.js");
var settingsController  = require('./settings/settings.js');
var uploadController = require('./upload/upload.js')
var appRouter = function(app) {
    songsController(app);
    playersController(app);
    wishlistController(app);
    settingsController(app);
    shutdownController(app);
    uploadController(app);
};

module.exports = appRouter;

# Shutdown per URL deaktiviert, solange keine Sicherheitsmechanismen aktiv.
# var shutdownController = require('./shutdown/shutdown.js');
