angular.module('conka.utils', [])
    .service('Utils', Utils);


function Utils() {
    return {
        getReadableTime: getReadableTime,
        getSecondsFromTime: getSeconds,
        getTimeFromSeconds: getTime
    };

    function getTime(seconds) {
        if (!seconds) return 'No TIme FOund';
        var date = new Date(null);
//        console.log(seconds);
        date.setSeconds(seconds);
        return date.toISOString().substr(11, 8);
    }

    function getSeconds(time) {
        if (!time) return 'Unknown Duration';
        var timeArray = time.split('.')[0].split(':');
        return parseInt(minutesToSeconds(parseInt(hoursToMinutes(timeArray[0])) + parseInt(timeArray[1])) + parseInt(timeArray[2]));
        
        function hoursToMinutes(hours) {
            return hours * 60;
        } 

        function minutesToSeconds(minutes) {
            return minutes * 60;    
        }
    }

    function getReadableTime(time) {
        if (!time) return 'Unknown Duration';
        var timeArray = time.split('.')[0].split(':');
        var timeString = '';
        var times = {
            0: 'h',
            1: 'm',
            2: 's'
        };
        for (var i = 0; i < timeArray.length; i++) {
            var t = timeArray[i];
            if (t > 0) {
                timeString += t + times[i];
                if (i != timeArray.length - 1) timeString += ' ';
            }
        }

        return timeString;
    }
}
