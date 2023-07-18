var shutdownService = require("./shutdownService.js");
var passport = require("../authService.js");
var shutdownController = function(app) {
    app.get('/shutdown/shutdown', passport.authenticate('digest', { session: false }), shutdownService.shutdown);
    app.get('/shutdown/reboot', passport.authenticate('digest', { session: false }), shutdownService.reboot);
};

module.exports = shutdownController;
