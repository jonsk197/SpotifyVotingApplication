var currentUserId;
var playlistId;
var playlistOwnerId;

votingControllers.controller('homeCtrl', function (Spotify, $scope, $http, $state, $sce) {
    // Set the token so spotify dont log you out from refreshing.
    Spotify.setAuthToken(localStorage.getItem('spotify-token'));
    
    //Show current user information
    Spotify.getCurrentUser().then(function (userData) {
        $scope.showPlaylist = false;
        $scope.showUserinfo = false;
        $scope.name = userData.display_name;
        $scope.em = userData.email; 
        $scope.id = userData.id;    
        currentUserId = userData.id;
        //Default picture if a user dont have a pic in spotify
        $scope.img = "static/img/user-icon.png";
        try {
            $scope.img = userData.images[0].url;
        }
        catch(err) {
            console.log("Error in loding image.");
        }

        var spotify_token = localStorage.getItem('spotify-token');
        userData.token = spotify_token;
        $http.post('/login', userData).success(function (response) {
        });

        // Get the users own lists only because it is only them we can modify
        $scope.getUserPlaylists(currentUserId);

    });

    // This functions run when you want to go back to your profile from visiting
    // another one
    $scope.getCurrentUser = function(){
            $scope.getUserPlaylists(currentUserId);
    };


    // Get and show the users playlist from spotify
    $scope.getUserPlaylists = function(userId){
        Spotify.getUserPlaylists(userId).then(function (userPlaylistData) {
            var playlists = userPlaylistData.items;
            for (i=0; i < playlists.length; i++) {
                // Only get those playlist the user owns
                if (userId !== playlists[i].owner.id) {
                    playlists.splice(i, 1);
                    i--;
                }
            }
            $scope.playlists = playlists;
            $http.post('/playlists', playlists).success(function (response) {
            });
        });
    };

    // This function is called when searching for a user
    $scope.selectedUserOrPlaylist = function (selected) {
        $scope.showUserinfo = true; 
        $scope.getUser(selected.description.username);
        $scope.getUserPlaylists(selected.description.username);
          
    };

    // Shows the information about the user you are visiting
    $scope.getUser = function(userIdLookup){
        Spotify.getUser(userIdLookup).then(function(userInfo){
            $scope.userLookupName = userInfo.display_name;
            $scope.userLookupId = userInfo.id;
            $scope.userLookupImg = userInfo.images[0].url;
        });
    };

    // Get users tracks from a playlist.
    $scope.getPlaylist = function (id, ownerId){
        $scope.showPlaylist = true;
        playlistId = id;
        playlistOwnerId = ownerId;

        Spotify.getPlaylistTracks(ownerId, playlistId).then(function(tracksinPlaylist){
            var tracks = {'track': tracksinPlaylist.items, 'playlist_id': playlistId};
            $scope.tracks = tracksinPlaylist.items;
            $http.post("/tracks", tracks).success(function(response) {
                
            });
        });
    };

    // Create a new spotify public playlist
    $scope.createNewPlaylist = function() {
        var playlistName = {
            name: $scope.newPlaylistName
        };

        // Dont forget to save to our own database also.
        Spotify.createPlaylist(currentUserId, playlistName).then(function(data){
            $scope.getUserPlaylists(currentUserId);
            $scope.newPlaylistName = null;
        });

    };

    // Toggle the showPlaylist variable (show the tracks)
    $scope.setShowPlaylist = function (){
        $scope.showPlaylist = !$scope.showPlaylist;
    };
    
    // Toggle showUserinfo (to show the visiting user profile or current logged
    // in profile)
    $scope.setShowUserinfo = function(){
        $scope.showUserinfo = !$scope.showUserinfo; 
    };

    // Not completed yet
    $scope.voteTrack = function (){
        console.log("The track have one more vote now.");
    };
    // Not completed yet
    $scope.loadMoreTracks = function (playlistId, trackSpan){
        console.log("Load more tracks from server!");
    };
    
    // Log out the user
    $scope.logout =  function(){
        localStorage.clear();
        $state.go("login");
    };
    
    // Deletes a track
    $scope.removeTrack = function(track_id, track_name){
        var confirm = window.confirm('Want to delete the track: ' + track_name);
        if (confirm === true) {
            Spotify.removePlaylistTracks(currentUserId, playlistId, track_id);
            $scope.getPlaylist(playlistId, playlistOwnerId);
        }
    };

    // Setting up the spotify url for playing tracks in spotify.
    $scope.playPlaylist = function(){
       $scope.currentPlayinglist = "https://embed.spotify.com/?uri=spotify:user:" + playlistOwnerId + ":playlist:" + playlistId;
       $scope.currentPlayinglistUrl = $sce.trustAsResourceUrl($scope.currentPlayinglist); 
    };

    // The format to search directly to spotify.
    // q: the input
    // type: what to search for
    $scope.dataFormatFn = function(str) {
        console.log("i dataformat och string = " + str);
        return {q: str, type: 'track,album,artist,playlist'}; 
    };

    // Not completed yet
    $scope.selectedTrack = function (selected) {
        window.alert('You have selected ' + selected.title);
    };


});
