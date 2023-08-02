var spawnSync = require('child_process').spawnSync;

let uploadPath = "/media/Kara/manueller_upload/" // ./ current directory ../ directory one level up

function getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
}

exports.upload = function(req, res, next) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        if (filename != '') {
            if (getFileExtension(filename) == "mp4" || getFileExtension(filename) == "avi"|| getFileExtension(filename) == "mkv") {
                

                mysql.connection.query('SELECT * FROM conka.songs WHERE datei = ? AND pfad = ? AND active = 1', [filename, uploadPath], function(err, rows, fields) {
                    if(err) res.send(err);
                    if (rows.length == 0) {
                        //Path where video will be uploaded
                        fstream = fs.createWriteStream(uploadPath + filename);
                        file.pipe(fstream);
                        fstream.on('close', function () {
                        	var info; 
							try {
								var out = spawnSync("ffprobe", [ "-hide_banner",  "'" + uploadPath + filename + "'" ], { shell: true }).output.toString();
								info = out;
							} catch (e) {
								console.log("Konnte Zeit nicht auslesen, default 3 Minuten.");
								info = "Duration: 00:03:00.00";
								console.log(e)
							}
							var duration = info.substring(info.indexOf("Duration")+10,info.indexOf("Duration")+21);
							mysql.connection.query('INSERT INTO conka.songs (pfad, datei, active, duration) VALUES (?, ?, 1, ?)', [uploadPath, filename, duration], function(err, rows, fields) {
								console.log("Upload Finished of " + filename);           
								res.redirect('/#/admin');           //where to go next
								})	
                            });
                    } else {
                        res.redirect('/#/admin')
                    }
                })
            } else {
                console.log('Die zu hochladene Datei ist kein avi/mp4/mkv.')
                res.redirect('/#/admin');
            };
        } else {
            console.log('Das sollte nicht passieren, beeinträchtigt aber nichts');
			res.status(204).end();
        }
    });
};
