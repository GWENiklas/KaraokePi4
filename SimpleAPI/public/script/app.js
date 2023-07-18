conka = angular.module("conka", ['ui.router', 'ui.sortable', 'ngLodash', 'conka.utils']);


conka.config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/suche");
    //
    // Now set up the states
    $stateProvider
        .state('suche', {
            url: "/suche",
            templateUrl: "pages/suche.html",
            controller: 'SearchCtrl'
        })
        .state('wunschliste', {
            url: "/wunschliste",
            templateUrl: "pages/wunschliste.html",
            controller: 'AdminCtrl'
        })
        .state('admin', {
            url: "/admin",
            templateUrl: "pages/admin.html",
            controller: 'AdminCtrl',
            resolve: {
                user: function($state, $timeout) {
                    return true
                }
            }
        });
});

conka.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13 && scope.keywords.length >= 3) { //TODO set back to 3
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});

function MainCtrl($state, $scope) {
    $scope.state = $state;
}

function AdminCtrl($scope, $http, $interval, Utils) {
    $scope.getReadableTime = Utils.getReadableTime;
    $scope.sortedSongList = [];
    $scope.getSongs = function () {
        $http.get('/wishlist')
            .success(function (data, status) {
                $scope.status = status;
                $scope.songs = data;
		var filteredSongList = getFilteredListWithoutDeletedElements($scope.sortedSongList, $scope.songs);
		var newSongs = getNewSongsForFilteredList(filteredSongList, $scope.songs);
		$scope.sortedSongList = filteredSongList.concat(newSongs);
		//console.log($scope.sortedSongList);
                var seconds = 0;
                $scope.fullTimeString = '';
                $scope.songs.map(function(song) {
                   seconds = (seconds + parseInt(Utils.getSecondsFromTime(song.duration)));
                });
                $scope.fullTimeString = Utils.getTimeFromSeconds(seconds);
//                console.log($scope.fullTimeString);
            })
            .error(function (data, status) {
                $scope.data = "Request failed";
                $scope.status = status;
            });
    };

    $scope.toggleWishlist = function() {
      $http.post('/settings/toggle/wishlist')
        .then(function(response) {
          //console.log(response);
          $scope.wishlist.active = response.data.active == 1;
        })
    }

    $http.get('/settings')
      .then(function(response) {
        $scope.wishlist = response.data.filter(function(setting) {
          setting.active = setting.active  == 1;
          return setting.id == 3;
        })[0]
      })

    $scope.getSongs();
    $interval($scope.getSongs, 1000);

    function getFilteredListWithoutDeletedElements(filteredSongList, songList) {
        return filteredSongList.filter(function(filteredSong) {
	    var array = songList.filter(function(song) {
			    return song.id == filteredSong.id;
			});
	    return array.length == 1;
	});
    }

    function getNewSongsForFilteredList(filteredSongList, songList) {
	     return songList.filter(function(song) {
		var array = filteredSongList.filter(function(filteredSong) {
				return song.id == filteredSong.id;
			    });
		return array.length == 0;
         });
    }
    

    $scope.playsong = function (song) {
        var pfad = song.pfad,
            title = song.datei;
            console.log(song)
        $http({
            method: 'GET',
            url: '/player/play/' + song.id
        }).success(function (data) {
            $scope.currentsong = data[0].datei || data;
            if (data.error) {
                //console.log(data.error.code);
            }
        })
    };

    $scope.deletesong = function (song) {
        var isDelete = confirm('Delete' + song.datei);
        // Simple POST request example (passing data) :
        if (isDelete) {
            $http.delete('/wishlist/' + song.ID).
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    var index = $scope.songs.indexOf(song);
                    $scope.songs.splice(index, 1);
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }
    };

    $scope.pause = function () {
        var isPause = confirm('Pause');
            $http.get('/player/pause').success(function () { });
    };

    $scope.stop = function () {
        var isStop = confirm('Stop');
        if (isStop) {
            $http.get('/player/stop').success(function (data) {
            });
        }
    }

    $scope.shutdown = function() {
        var isShutdown = confirm('Achtung: Das System fährt hiermit herunter! Bist du dir Sicher?');

        if (isShutdown) {
            $http.get('/shutdown/shutdown').
                success(function (data, status, headers, config) {

                }).
                error(function (data, status, headers, config) {

                });
        }
    }

    $scope.reboot = function() {
        var isShutdown = confirm('Achtung: Das System startet hiermit neu! Bist du dir Sicher?');

        if (isShutdown) {
            $http.get('/shutdown/reboot').
                success(function (data, status, headers, config) {

                }).
                error(function (data, status, headers, config) {

                });
        }
    }
}

function SearchCtrl($scope, $http, $window, $stateParams, $state, Utils) {
    $scope.getReadableTime = Utils.getReadableTime;
    $scope.error = false;
    $scope.search = function () {
        if ($scope.keywords.length >= 3) {
            $scope.url = '/songs/file/' + encodeURIComponent($scope.keywords) + '?nickname=' + $scope.user;
            $http.get($scope.url).
                success(function (data, status) {
                    if (data.length == 0) {
                        $scope.addwishmessage = null;
                        $scope.addwisherror = 'Unter "' + $scope.keywords + '" haben wir nichts gefunden';
                        $("html, body").animate({ scrollTop: 0 }, 500);
                    } else {
                        $scope.addwishmerror = null;
                        $scope.status = status;
                        $scope.songs = data;
                        $scope.error = data.error ? true : false;
                    }

                })
                .
                error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
        }
    };

    $scope.addwish = function (song) {
        var user = $scope.user;
        if (user) {
            $scope.url = '/wishlist';
            $http.post($scope.url, {"songId": song.id, "nickname": user}).
                success(function (data, status) {
                    if (data.status == 'wishFail') {
                        $scope.addwishmessage = null;
                        $scope.addwisherror = data.text;
                    } else {
                        $scope.addwishstatus = status;
                        $scope.addwisherror = null;
                        $scope.addwishmessage = user + ' hat sich ' + song.datei + ' gewünscht';
                        $scope.data = data;
                    }
                    $("html, body").animate({ scrollTop: 0 }, 500);
                })
                .error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                    $("html, body").animate({ scrollTop: 0 }, 500);
                });
        } else {
            $scope.addwishmessage = null;
            $scope.addwisherror = 'Bitte gebe deinen Namen ein';
            $("html, body").animate({ scrollTop: 0 }, 500);

        }
    };
}
