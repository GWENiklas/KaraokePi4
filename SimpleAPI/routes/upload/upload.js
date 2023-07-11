var uploadService = require("./uploadService.js");
var uploadController = function(app) {
    app.post('/upload', uploadService.upload);
};

module.exports = uploadController;
