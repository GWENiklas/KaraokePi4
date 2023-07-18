var uploadService = require("./uploadService.js");
var passport = require("../authService.js");

var uploadController = function(app) {
    app.post('/upload', passport.authenticate('digest', { session: false }), uploadService.upload);
};

module.exports = uploadController;
