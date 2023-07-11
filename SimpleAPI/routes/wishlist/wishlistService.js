exports.findAll = function(req, res) {
    mysql.connection.query('SELECT *, nickname as nn, ip as ipp, (SELECT COUNT(conka.wishlist2.nickname) FROM conka.wishlist2 WHERE conka.wishlist2.nickname = nn AND conka.wishlist2.active = 1) as wishes, (SELECT COUNT(conka.wishlist2.ip) FROM conka.wishlist2 WHERE conka.wishlist2.ip = ipp AND conka.wishlist2.active = 1) as ipCount FROM conka.wishlist2 INNER JOIN conka.songs ON conka.wishlist2.song_id = conka.songs.ID WHERE conka.wishlist2.active = 1', function(err, rows, fields) {
        if(err) res.send(err);

        res.send(rows);
    });
};

exports.findById = function(req, res) {
    mysql.connection.query('SELECT * FROM conka.wishlist2 WHERE id = ? AND active = 1', [req.params.id], function(err, rows, fields) {
        if(err) res.send(err);
        res.send(rows);
    });
};

exports.addWish = function(req, res) {
    mysql.connection.query('SELECT * FROM conka.allowed_ips', function(err, rows, fields) {
        if (err) res.send(err);
        var ips = rows.map(function(ipObject) { if (ipObject.bypass == 'all') return ipObject.ip; });
        var wishlistIps = rows.map(function(ipObject) { if (ipObject.bypass == 'wishlist') return ipObject.ip });
        mysql.connection.query('SELECT * FROM conka.settings WHERE name = "wishtime"', function(err, rows, fields) {
            if (err) res.send(err);
            if (rows[0].active != 1 && ips.indexOf(req.connection.remoteAddress) < 0) {
                res.send({
                    status: 'wishFail',
                    text: 'Die Wunschfunktion wurde deaktiviert, für genauere Informationen wenden Sie sich bitte an die Karaoke Helfer'
                })
            } else {
                mysql.connection.query('SELECT * FROM conka.wishlist2 WHERE active = 1 AND ip = ?', [req.connection.remoteAddress], function(err, rows, fields) {
                    if (err) res.send(err);
                    if(rows.length >= 1 && (wishlistIps.indexOf(req.connection.remoteAddress) < 0 && ips.indexOf(req.connection.remoteAddress) < 0)) {
                        console.log(req.body.nickname + ' hat sich ' + req.body.songId + ' gewünscht. Es ist nur ein Songwunsch möglich.');
                        res.send({
                            status: 'wishFail',
                            text: 'Sie können sich nur einen Song wünschen. Nach dem Sie Ihren ersten Song gesungen haben können Sie sich erneut einen Song wünschen!'
                        })
                    } else {
                        console.log(req.body.nickname + ' hat sich ' + req.body.songId + ' gewünscht');
                        mysql.connection.query('INSERT INTO conka.wishlist2 (nickname, song_id, ip) VALUES (?, ?, ?)', [req.body.nickname, parseInt(req.body.songId), req.connection.remoteAddress], function(err, rows, fields) {
                            if (err) res.send(err);
                            res.send(rows);
                        });
                    }
                });
            }
        });
    });
};

exports.removeWish = function(req, res) {
    mysql.connection.query('UPDATE conka.wishlist2 SET active = 0 WHERE ID = ?', [req.params.id], function(err, rows, fields) {
        if (err) res.send(err);
        res.send(rows);
    })
};
