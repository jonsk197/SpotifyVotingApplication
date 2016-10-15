votingControllers.controller('LoginCtrl', function (Spotify, $scope, $state) {
    /*
     * Logs the user in with spotify when pressing the login button
     */
    $scope.login = function() {
        Spotify.login().then(function(data) {
            $state.go("home");
        });
    };

});
