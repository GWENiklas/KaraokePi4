var omxplayerService = require("./omxplayer/omxplayerService.js");
var playersController = function(app) {
    app.get('/player/play/:id', omxplayerService.play);
    app.get('/player/stop', omxplayerService.stop);
    app.get('/player/resume', omxplayerService.resume);
    app.get('/player/pause', omxplayerService.pause);
    app.get('/player/get-status', omxplayerService.getStatus);
};

module.exports = playersController;

