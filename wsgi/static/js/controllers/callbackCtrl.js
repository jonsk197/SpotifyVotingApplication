var votingControllers = angular.module('votingControllers', []);
votingControllers.controller('callbackCtrl', function ($state) {
    var hash = window.location.hash;
    // When redirecting back from spotify login we check if we got an access
    // token in the url (spotify does that) back from spotify then save it.
    if (hash.indexOf("access_token") > -1 ) {
        var token = hash.split('&')[0].split('=')[1];
        localStorage.setItem('spotify-token', token);
    }
    // these else if and else is runned everytime you try to access an url that
    // does not exist
    else if (localStorage.getItem('spotify-token') !== null) {
        $state.go('home');
    }    
    else {
       $state.go("login");
    }
});
