from flask import request
from database_handler import db, User, Playlists, Track, app
import json


# Create the database models
db.create_all()


@app.route('/')
def home():
    """return the index.html file to the client"""
    return app.send_static_file('index.html')


@app.route('/login', methods=['POST'])
def login():
    """The login function passes the essential user data from the spotify api
    to the database."""
    if request.method == 'POST':
        user_json = request.get_json()
        user_id = user_json.get('id')
        name = user_json.get('display_name')
        token = user_json.get('token')
        user = User(user_id, name, token)
        # Checks if user already exist in database before adding
        change_user = User.query.filter_by(username=user_id).first()
        if change_user:
            change_user.token = token
            db.session.commit()
        try:
            db.session.add(user)
            db.session.commit()
            print(user_id + " added")
        except Exception:
            print(user_id + " already exists")
            db.session.rollback()
        return ""


@app.route('/search')
def search_for_user():
    """Searches for a user in the database. The input comes from search field
    that uses angucomplete-alt"""
    searchInput = request.args['searchStr']
    query = User.query.filter(User.name.contains(searchInput)).all()
    result = []
    for q in query:
        result.append({'name': q.name, 'username': q.username})
    return json.dumps({'data': result})


@app.route('/playlists', methods=['POST'])
def add_playlist_to_db():
    """Saves the playlist id and owner id to the database."""
    if request.method == 'POST':
        playlist_json = request.get_json()
        for playlists in playlist_json:
            playlist_id = playlists['id']
            user_id = playlists['owner']['id']
            playlists = Playlists(playlist_id, user_id)
            try:
                db.session.add(playlists)
                db.session.commit()
                print(playlist_id + " added")
            except Exception:
                print(playlist_id + " already exists")
                db.session.rollback()
    return ''


@app.route('/tracks', methods=['POST'])
def add_tracks_to_db():
    """Saves the tracks id and playlist id to the database. This is because we
    want to be able to save votes"""
    if request.method == 'POST':
        tracks_json = request.get_json()
        playlistId = tracks_json.get('playlist_id')
        tracks = tracks_json.get('track')
        for track in tracks:
            trackId = track['track']['id']
            song = Track(playlistId, trackId)
            track_exist = Track.query.filter_by(playlist_id=playlistId,
                                                track_id=trackId).first()
            if track_exist:
                print(" these exist")
                return ''
            try:
                db.session.add(song)
                db.session.commit()
                print(trackId + " song added")
            except Exception:
                db.session.rollback()
                print("something went wrong")
        return ''


@app.errorhandler(404)
def fallback(e):
    """If something goes wrong"""
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(debug=True)
