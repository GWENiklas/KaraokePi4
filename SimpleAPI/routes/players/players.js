var vlcplayerService = require("./cvlc/cvlcService.js");
var passport = require("../authService.js");
var playersController = function(app) {
    app.get('/player/play/:id', passport.authenticate('digest', { session: false }), vlcplayerService.play);
    app.get('/player/stop', passport.authenticate('digest', { session: false }), vlcplayerService.stop);
    app.get('/player/resume', passport.authenticate('digest', { session: false }), vlcplayerService.resume);
    app.get('/player/pause', passport.authenticate('digest', { session: false }), vlcplayerService.pause);
    //app.get('/player/get-status', vlcplayerService.getStatus);
};

module.exports = playersController;

