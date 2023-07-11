// shutdown.js

// Require child_process
var exec = require('child_process').exec;

// Create shutdown function
exports.shutdown = function shutdown(callback){
    exec('shutdown now', function(error, stdout, stderr){ callback(stdout); });
};

// Create reboot function
exports.reboot = function reboot(callback){
    exec('shutdown -r now', function(error, stdout, stderr){ callback(stdout); });
};