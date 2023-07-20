var passport = require("../authService.js");
var adminController = function(app) {
	app.get('/admin', passport.authenticate('digest', { session: false }), (req, res) => { res.redirect('/#/admin') });
}
module.exports = adminController;
