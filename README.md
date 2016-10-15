TDDD27 - Spotify voting application
==============
In the course TDDD27 are asked to build a web application. This application will provide a service to easily organize music playing where everyone has a chance to speak up.

The members that will be working with this project are: Milad Barsomo (milba894), Hugo Hedelin (hughe531) and Jonas Skog (jonsk197)

The openshift link:
http://votingapp-spotifyvotingapp.openshift.ida.liu.se/#/

The screencast:
https://youtu.be/5oyCemzfatE
***

Functional specification:
--------------
We will use the Spotify web API in order to make an online playlist voing application. The application will provide the user with a tool to take away 
all sad faces on the pre party. With this tool you no longer have to listen to the jerk playing only his own songs all night long. 

The webapplication will enable users to have their playlists published such that other users will be able to browse. 
The users that are allowed access to the shared playlist will have the ability to "nominate" tracks (i.e add the tracks to the playlist with one "up-vote"), but also the ability to up-vote the tracks they want to listen to, and the tracks that have the most up-votes will be played first.
With other words when you up-vote a track, the position of the track in the playing queue will change. The initial plan is that you will 
be able to both play the music in the online application as a "host" while the other people voting the music up and down as well as in the 
spotify application. This in order to make the application to run on all platforms. This area is completely unexplored for us yet so we are not entirely 
sure of what can be achieved. Obviously it will be that you log in with your Spotify account to create/play from a playlist. 

Technological specification:
--------------

We are going to use AngularJS as our client side framework. 

We are going to use FLASK microframework for our server side implementation. For our datastorage we are going to use Flask-SQLAlchemy which is an extension for Flask that adds support for the object-relational mapper (ORM) software toolkit SQLAlchemy. The authentication will be handled through the Spotify API using OAuth 2.0.



Installation
--------------

Download the source code of the project with git:

```ruby
git clone <repo url>
cd  TDDD272015_spotify_voting_application
```

Dependencies
--------------
Download the Spotify angular souce code, the following example is with npm and bower (installing angular components in the static folder:

```ruby
sudo npm install -g bower &&
cd wsgi/static &&
bower install angular-spotify --save
```
Use the --save property to save into your bower.json file.

Install angucompleter-alt with:

```ruby
bower install angucomplete-alt --save
```

You also need to intstall SQLAlchemy. We encourage you to use a virtualenv. Check the docs for complete installation and usage instructions. If you stand in the 
project folder you can run the following command:

```ruby
sudo pip install Flask-SQLAlchemy
```

And then install bootstrap for angular, https://github.com/angular-ui/bootstrap:

```ruby
bower install angular-bootstrap
```

Run
--------------
Open a terminal, use cd to move to the folder where the project is located. Run the following command:

```ruby
Python2.7 server.py
```

Then you simply open http://localhost:5000/ in your browser. Or you can follow the instructions given in the terminal, looks something like this:

```ruby
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
* Restarting with stat
```




