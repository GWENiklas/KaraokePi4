let uploadPath = "/media/Kara/manueller_upload/" // ./ current directory ../ directory one level up

function getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
}

exports.upload = function(req, res, next) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        //console.log("Uploading: " + filename);
        //console.log(getFileExtension(filename));
        if (getFileExtension(filename) == "mp4" || getFileExtension(filename) == "avi"
            || getFileExtension(filename) == "mkv") {
                

                mysql.connection.query('SELECT * FROM conka.songs WHERE datei = ? AND pfad = ? AND active = 1', [filename, uploadPath], function(err, rows, fields) {
                    if(err) res.send(err);
                    if (rows.length == 0) {
                        //Path where video will be uploaded
                        fstream = fs.createWriteStream(uploadPath + filename);

                        file.pipe(fstream);
                        fstream.on('close', function () { 
                            new ffmpeg(uploadPath + filename, function (err, video) {
                                if (!err) {
                                var duration = video.metadata.duration.raw
                                    mysql.connection.query('INSERT INTO conka.songs (pfad, datei, active, duration) VALUES (?, ?, 1, ?)', [uploadPath, filename, duration], function(err, rows, fields) {
                                        //console.log("Upload Finished of " + filename);           
                                        res.redirect('/#/admin');           //where to go next
                                    })     
                                    }
                        
                            });
                        });
                    } else {
                        res.redirect('/#/admin')
                    }
                })
            } else {
                console.log("wrong file format!")
                res.redirect('/#/admin');
            };
    });
};
