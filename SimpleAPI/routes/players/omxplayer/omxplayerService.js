var OmxManager = require('omx-manager');
var manager = new OmxManager();
var player,
    timer = new Stopwatch();
exports.play = function(req, res) {
    if (isPlayerRunning(player)) return res.send('player already running');
    mysql.connection.query('SELECT * FROM conka.songs WHERE id = ' + req.params.id, function(err, rows, fields) {
        if (err) res.send(err);
        if (rows.length > 0) {

        
        player = manager.create(rows[0].pfad + rows[0].datei, {'-o':'both'});
        player.play();
        //timer.start();
        
        console.log('player started');
        res.send(rows);
        } else {
            res.send('not found');
        }
    });

};


exports.stop = function(req, res) {
    if (!isPlayerRunning(player)) return res.send('player isn\'t running');
    
    player.stop();
    //timer.clear();
    //player = undefined;
    console.log('player stopped');
    res.send('song stopped!');
};

exports.resume = function(req, res) {
    if (!player) return res.send('no instance found');
    if (isPlayerRunning(player)) return res.send('player is playing');
    player.play();
    console.log('player resumed');
    res.send('song resumed');
};

exports.pause = function(req, res) {
    if (!player) res.send('player isn\'t running');
    if (player && player.getStatus().current && player.getStatus().playing) {
        player.pause();
        console.log('player paused');
        //timer.stop();
        res.send('player paused');
    } else if(player && player.getStatus().current && !player.getStatus().playing) {
        player.play();
        console.log('player resumed');
        //timer.start();
        res.send('player resumed');
        
    }
};

exports.getStatus = function(req, res) {
    if (!player) return res.send('no instance found');
    console.log('get player status');
    player.getStatus().timeElapsed = timer.getSeconds();
    res.send(player.getStatus());
};

function isPlayerRunning(player) {
    if (!player) return false;
    return player.getStatus().playing
}


function Stopwatch2() {
  var startTime, 
  endTime, 
  instance = this;

  this.start = function() {
    startTime = new Date();
  }

  this.stop = function() {
    endTime = new Date();
  }
  
    

  this.clear = function() {
    startTime = null;
    endTime = null;
  }

  this.getSeconds = function(currentDate) {
    if(!endTime) {
      return Math.round((new Date().getTime() - startTime.getTime()) / 1000);
    }

    return Math.round((endTime.getTime() - startTime.getTime()) / 1000);
  }

  this.getMinutes = function (currentDate) {
    return instance.getSeconds(currentDate) / 60;
  }

  this.getHours = function(currentDate) {
    return instance.getSeconds(currentDate) / 60 / 60;
  }

  this.getDays = function(currentDate) {
    return instance.getHours() / 24;
  }
}

function Stopwatch() {
  var startTime, 
      endTime, 
      time = [];
  instance = this;

  this.start = function() {
    startTime = new Date();
    time.push(new Date());
    console.log('startTime: ', startTime);
  }

  this.stop = function() {
    endTime = new Date();
    time.push(new Date());
  }

  this.clear = function() {
    startTime = null;
    endTime = null;
    time.length = 0;
  }

  this.getSeconds = function() {
    console.log(time);
    console.log(time.length);
    if (time.length == 0) return 0;
    var t = 0;
    for (var i = 0;  i < time.length; i += 2) {
      var eT = time[i + 1] || new Date();
      var sT = time[i];
      if (!sT) {
        t += 0;
      } else {
        t += Math.floor((eT.getTime() - sT.getTime()) / 1000);
      }
    }

    return t;
  }

  this.getMinutes = function () {
    return instance.getSeconds() / 60;
  }

  this.getHours = function() {
    return instance.getSeconds() / 60 / 60;
  }

  this.getDays = function() {
    return instance.getHours() / 24;
  }
}
