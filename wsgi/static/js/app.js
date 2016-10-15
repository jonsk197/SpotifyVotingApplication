// Declare our module with the dependencies
var votingApp = angular.module('votingApp', ['spotify', 'ui.router', 'votingControllers', 'angucomplete-alt', 'ui.bootstrap']);

/*
 * Using ui-router we configure the url and states 
 */
votingApp.config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: "/",
        templateUrl: "static/views/login.html",
        controller: "LoginCtrl",
        startView: true
      })
/*      .state('account', {
          url: "/account",
          templateUrl: "static/views/account.html",
          controller: "accountCtrl",
          secure: true
      })
      .state('account.user', {
          url: "/:userid",
          views: {
              'content': {templateUrl: 'static/views/profile.html'} 
          }
      }) */
      .state('home', {
        url: "/home",
        templateUrl: "static/views/home.html",
        secure: true
      })
      .state('otherwise', {
          url: "*path",
          controller: "callbackCtrl"
      });
})
 .run(['$rootScope', '$state', function($rootScope, $state) {
        // A listener for changing a state.
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            //redirects to home page if user is already logged in and
            //trying to go to the login page
            if (localStorage.getItem('spotify-token') !== null && toState.startView){
                event.preventDefault();
                $state.go("home");
            }
            //redirect to login page if user is not logged in and op
            //trying to access a secure page
            if (toState.secure && localStorage.getItem('spotify-token') === null) {
                window.alert("You have to log in");
                event.preventDefault();
                $state.go("login");
            }
        });
    }]);
/*
 * Configure the spotify settings by setting the clientId, redirectUri and the
 * scope. Scope is properties that we ask permission of from the user for using
 * our website.
 */
votingApp.config(function (SpotifyProvider) {
    // Just to make the redirect url correct 
    var url = window.location.href;
    if(url.indexOf("/#/") == -1){
        if (url.indexOf("/#") > -1){
            url = url +"/";
        }
        else{
            if(url.indexOf("#/") == -1){
                url = url+"#/";
            }
        }
    }
    // This is if the user refresh the website while logged in and logs out.
    if(url.indexOf("/#/home") > -1){
        url= url.replace('/#/home','/#/');
    }

    console.log("url: " + url);
    SpotifyProvider.setClientId('43749728e0614eac87265b95140168d7');
    SpotifyProvider.setRedirectUri(url + 'callback');
    SpotifyProvider.setScope('user-read-private user-read-email playlist-modify-private playlist-modify-public playlist-read-private');
});
