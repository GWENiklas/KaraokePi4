exports.findAll = function(req, res) {
    mysql.connection.query('SELECT * FROM conka.songs WHERE active = 1', function(err, rows, fields) {
        if(err) res.send(err);
        res.send(rows);
    });
};

exports.findById = function(req, res) {
    mysql.connection.query('SELECT * FROM conka.songs WHERE id = ? AND active = 1', [req.params.id], function(err, rows, fields) {
        if(err) res.send(err);
        res.send(rows);
    });
};

exports.findByName = function(req, res) {
    //console.log(req);
    //var query = 'SELECT * FROM conka.songs WHERE datei LIKE "%?%"';
    console.log((req.query.nickname ? req.query.nickname : 'n.a.') + ' sucht nach: ' + req.params.file);
    addSearchQueryToDatabase(req.params.file);
    mysql.connection.query('SELECT * FROM conka.songs WHERE datei LIKE ? AND active = 1', ['%'+req.params.file+'%'], function(err, rows, fields) {
        if(err) res.send(err);
        res.send(rows);
    })
};

function addSearchQueryToDatabase(text) {
    mysql.connection.query('INSERT INTO conka.searchEntrys (text) VALUES (?)', [text], function(err, rows, fields) {

    })
}