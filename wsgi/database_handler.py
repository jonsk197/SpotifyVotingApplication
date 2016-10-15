from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)


# Creates a user table
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    name = db.Column(db.String(100), nullable=False)
    token = db.Column(db.String(300), nullable=False)

    def __init__(self, username, name, token):
        self.username = username
        self.name = name
        self.token = token

    def __repr__(self):
        return '<User %r>' % self.username


# Creates a table for Playlists
class Playlists(db.Model):
    Playlist_id = db.Column(db.String(80), primary_key=True)
    user_id = db.Column(db.String(80), unique=False)

    def __init__(self, Playlist_id, user_id):
        self.Playlist_id = Playlist_id
        self.user_id = user_id

    def __repr__(self):
        return '<Playlist_id %r>' % self.Playlist_id


# Creates a table for all the tracks
class Track(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    playlist_id = db.Column(db.String(80), unique=False)
    track_id = db.Column(db.String(80), unique=False)

    def __init__(self, playlist_id, track_id):
        self.playlist_id = playlist_id
        self.track_id = track_id

    def __repr__(self):
        return '<Track %r>' % self.track_id
