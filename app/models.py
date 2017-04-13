#! python

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring
# pylint: disable = no-member
# pylint: disable = too-many-arguments
# pylint: disable = too-many-instance-attributes
# pylint: disable = too-few-public-methods

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

# Establish connection between Flask app and Postgres database
app = Flask(__name__)
app.config[
    'SQLALCHEMY_DATABASE_URI'] =                                    \
    'postgres://postgres:SoftwareEngineering!420@35.184.149.32/boswe'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)
db = SQLAlchemy(app)

# Models a Track (Song) object
# Populated via Spotify and Musicgraph APIs


class Track(db.Model):
    __tablename__ = 'tracks'

    # Define columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    genre = db.Column(db.String(25))
    release_date = db.Column(db.String(15))
    duration = db.Column(db.Integer)
    popularity = db.Column(db.Integer)
    preview_url = db.Column(db.String(200))
    explicit = db.Column(db.Boolean)
    spotify_uri = db.Column(db.String(100))

    # Reference to artists table
    # Auto-populates Artist.tracks
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))

    # Reference to albums table
    # Auto-populates Album.tracks
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'))

    # Creates a Track object manually
    def __init__(self, name, genre, release_date, duration,
                 popularity, preview_url, explicit, spotify_uri):
        assert name != ""
        assert genre != ""
        assert release_date != ""
        assert duration > 0
        assert popularity >= 0 and popularity <= 100
        assert preview_url != ""
        assert explicit != ""
        assert spotify_uri != ""

        self.name = name
        self.genre = genre
        self.release_date = release_date
        self.duration = duration
        self.popularity = popularity
        self.preview_url = preview_url
        self.explicit = explicit
        self.spotify_uri = spotify_uri

# Models a Concert object
# Populated via Bandsintown


class Concert(db.Model):
    __tablename__ = 'concerts'

    # Define Columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    event_link = db.Column(db.String(200))
    date = db.Column(db.String(15))
    time = db.Column(db.String(10))

    # Reference to venues table
    # Auto-populates Venue.concerts
    venue_id = db.Column(db.Integer, db.ForeignKey('venues.id'))

    # db.relationship to artists table
    # Auto-populates Artist.concerts
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))

    # db.relationship to albums table
    # Auto-populates Album.concerts
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'))

    # Create a Concert manually
    def __init__(self, name, event_link, date, time):
        assert name != ""
        assert event_link != ""
        assert date != ""
        assert time != ""

        self.name = name
        self.event_link = event_link
        self.date = date
        self.time = time

    # Debug print method
    def __repr__(self):
        return "<Concert(name='%s')>" % (self.name)


# Models and Album object
# Populated via Spotify and Musicgraph


class Album(db.Model):
    __tablename__ = 'albums'

    # Define Columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    genre = db.Column(db.String(50))  # db.Column(db.String(100))
    release_date = db.Column(db.String(15))
    album_cover_url = db.Column(db.String(200))
    label = db.Column(db.String(100))
    number_of_tracks = db.Column(db.Integer, nullable=True)
    spotify_uri = db.Column(db.String(100))

    # db.relationship to artists table
    # Auto-populates Artist.albums
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))

    # db.relationship to tracks table
    # Auto-populates Track.album
    tracks = db.relationship('Track',
                             order_by=Track.popularity, backref='album')

    # db.relationship to concerts table
    # Auto-populates Concert.album
    concerts = db.relationship('Concert',
    						  order_by=Concert.date, backref='album')

    # Creates an Album manually
    def __init__(self, name, genre, release_date, album_cover_url, label,
                 number_of_tracks, spotify_uri):
        assert name != ""
        assert genre != ""
        assert release_date != ""
        assert album_cover_url != ""
        assert label != ""
        assert number_of_tracks > 0
        assert spotify_uri != ""

        self.name = name
        self.genre = genre
        self.release_date = release_date
        self.album_cover_url = album_cover_url
        self.label = label
        self.number_of_tracks = number_of_tracks
        self.spotify_uri = spotify_uri

    # Debug print method
    def __repr__(self):
        return "<Album(name='%s', label=%s)>" % (self.name, self.label)

# Models an Artist object
# Populated via Spotify and Musicgraph


class Artist(db.Model):
    __tablename__ = 'artists'

    # Define columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    image_url = db.Column(db.String(200))
    country = db.Column(db.String(50))
    decade = db.Column(db.String(100))
    genre = db.Column(db.String(100))

    # db.relationship to albums table
    # Auto-populates Album.artist
    albums = db.relationship('Album', order_by=Album.release_date, backref='artist')

    # db.relationship to tracks table
    # Auto-populates Track.artist
    tracks = db.relationship('Track',
                             order_by=Track.popularity,
                             backref='artist')

    # relationship to concerts table
    # Auto-populates Concert.artist
    concerts = db.relationship('Concert', order_by=Concert.date, backref='artist')

    # Create an Artist manually
    def __init__(self, name, image_url, country, decade, genre):
        assert name != ""
        assert image_url != ""
        assert country != ""
        assert decade != ""
        assert genre != ""

        self.name = name
        self.image_url = image_url
        self.country = country
        self.decade = decade
        self.genre = genre

    # Debug print method
    def __repr__(self):
        return "<Artist(name='%s')>" % (self.name)

# Models a Venue object
# Populated via Bandsintown


class Venue(db.Model):
    __tablename__ = 'venues'

    # Define Columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    city = db.Column(db.String(50))
    region = db.Column(db.String(50))
    country = db.Column(db.String(50))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    # db.relationship with concerts table
    # Auto-populates Concert.venue
    concerts = db.relationship('Concert', backref='venue')

    # Create a Venue manually
    def __init__(self, name, city, region, country, latitude, longitude):
        assert name != ""
        assert city != ""
        assert country != ""
        assert latitude >= -90 and latitude <= 90
        assert longitude >= -180 and longitude <= 180

        self.name = name
        self.city = city
        self.region = region
        self.country = country
        self.latitude = latitude
        self.longitude = longitude

    # Debug print method
    def __repr__(self):
        return "<Venue(name='%s', city='%s')>" % (self.name, self.city)

# Create the tables
db.create_all()

# Drop Tables when necessary
# db.reflect()
# db.drop_all()


# Commit changes
db.session.commit()
