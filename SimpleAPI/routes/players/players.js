var vlcplayerService = require("./cvlc/cvlcService.js");
var playersController = function(app) {
    app.get('/player/play/:id', vlcplayerService.play);
    app.get('/player/stop', vlcplayerService.stop);
    app.get('/player/resume', vlcplayerService.resume);
    app.get('/player/pause', vlcplayerService.pause);
    //app.get('/player/get-status', vlcplayerService.getStatus);
};

module.exports = playersController;

