var songsService = require("./songsService.js");
var songsController = function(app) {
    app.get('/songs', songsService.findAll);
    app.get('/songs/:id', songsService.findById);
    app.get('/songs/file/:file', songsService.findByName);
};

module.exports = songsController;
