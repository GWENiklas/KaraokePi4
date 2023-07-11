exports.getSettings = function(req, res) {
    mysql.connection.query('SELECT * FROM conka.settings', function(err, rows, fields) {
        if(err) res.send(err);

        res.send(rows);
    });
};

exports.toggleWishlist = function(req, res) {
    mysql.connection.query('SELECT active FROM conka.settings WHERE id = 3', function(err, rows, fields) {
        if (err) res.send(err);
	//console.log(rows);
        var obj = rows[0];
        var active = !rows[0].active ? 1 : 0;
        obj.active = active;
        var message = !!active ? 'Wishlist activated' : 'Wishlist deactivated';
        console.log(message);

        mysql.connection.query('UPDATE conka.settings SET active = ? WHERE id = 3', [active], function(err) {
            if (err) res.send(err);

            res.send(obj);
        });;
    });
};
