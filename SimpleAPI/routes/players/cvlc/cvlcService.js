//var exec = require('child_process').exec;
var exec = require('child_process').exec;
  
	exports.play = function(req, res) {
    //if (isPlayerRunning(player)) return res.send('player already running'); // Temp OFF

    mysql.connection.query('SELECT * FROM conka.songs WHERE id = ' + req.params.id, function(err, rows, fields) {
        if (err) res.send(err);
        if (rows.length > 0) {
	  exec('pkill -9 vlc');
          exec('cvlc "'+ rows[0].pfad + rows[0].datei +'" --no-video-title vlc://quit');
            //console.log('>>>>');
            //console.log(rows);
            
        //player = manager.create(rows[0].pfad + rows[0].datei, {'-o':'both'});
        //player.play();
        //timer.start();
        console.log(rows);
        console.log('player started!');
            res.send(rows);
        } else {
            res.send('not found');
        }
    });
};

exports.stop = function stop(req, res){
  console.log('Der aktuelle Song wurde gestoppt.');
  exec('pkill -9 vlc');
  res.send('player stopped');

};

exports.resume = function pause(req, res){
  console.log('Der aktuelle Song wurde pausiert.');
  exec('dbus-send --type=method_call --dest=org.mpris.MediaPlayer2.vlc /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.PlayPause');
  res.send('player paused');
};

exports.pause = function pause(req, res){
  console.log('Der aktuelle Song wurde pausiert.');
    exec('dbus-send --type=method_call --dest=org.mpris.MediaPlayer2.vlc /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.PlayPause');
  res.send('player paused');
  };

function isPlayerRunning(player) {
    if (!player) {
        return false
    } else {
        return true
    }
} 
