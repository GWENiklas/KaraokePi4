var shutdownService = require("./shutdownService.js");
var shutdownController = function(app) {
    app.get('/shutdown/shutdown', shutdownService.shutdown);
    app.get('/shutdown/reboot', shutdownService.reboot);
};

module.exports = shutdownController;
