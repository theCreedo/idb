#! python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://postgres:swe2017@35.184.149.32/boswe'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app) 


class Track(db.Model):
    __tablename__ = 'tracks'

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

    def __init__(self, name, genre, release_date, duration,
                 popularity, preview_url, explicit, spotify_uri):
        assert (name != "")
        assert (genre != "")
        assert (release_date != "")
        assert (duration > 0)
        assert (popularity >= 0 and popularity <= 100)
        assert (preview_url != "")
        assert (explicit != "")
        assert (spotify_uri != "")

        self.name = name
        self.genre = genre
        self.release_date = release_date
        self.duration = duration
        self.popularity = popularity
        self.preview_url = preview_url
        self.explicit = explicit
        self.spotify_uri = spotify_uri

    def __repr__(self):
        return "<Track(name='%s', artist='%s')>" % (self.name, self.artist.name)

# Association class to model the many-to-many db.relationship between
# Concerts and Artists and Albums
class Concert_AA_Association(db.Model):
    __tablename__ = 'concert_aa_pairs'

    id = db.Column(db.Integer, primary_key=True)

    # Reference to concerts table
    # Auto-populates Concert.artist_album_pairs
    concert_id = db.Column(db.Integer, db.ForeignKey('concerts.id'))

    # Reference to artist_album_pairs table
    aa_id = db.Column(db.Integer, db.ForeignKey('artist_album_pairs.id'))

    def __repr__(self):
        return "<Concert_AA_Association(concert='%s', artist='%s', album='%s'\
            )>" % (self.concert.name, self.artist_album.artist.name,
            self.artist_album.album.name)

# Association Class to model the many-to-many db.relationship between
# Artists and Albums
class Artist_Album_Association(db.Model):
    __tablename__ = 'artist_album_pairs'

    id = db.Column(db.Integer, primary_key=True)

    # Reference to artists table
    # Auto-populates Artist.albums
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))

    # Reference to albums table
    # Auto-populates Album.artists
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'))

    # Reference to Concert_AA_Association table
    concerts = db.relationship('Concert_AA_Association',
        order_by=Concert_AA_Association.id, backref='aa_association')

    def __repr__(self):
        return "<Artist_Album_Association(artist='%s', album='%s')>" %\
            (self.artist.name, self.album.name)


class Artist(db.Model):
    __tablename__ = 'artists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    image_url = db.Column(db.String(200))
    country = db.Column(db.String(50))
    decade = db.Column(db.String(100))
    genre = db.Column(db.String(100)) #db.Column(db.PickleType(mutable=True)) 

    # Reference to an artist's most popular track
    # most_popular_track_id = db.Column(db.Integer, db.ForeignKey('tracks.id'))
    # most_popular_track = db.relationship('Track', foreign_keys=[most_popular_track_id])

    # db.relationship to artist_album_pairs table
    # Auto-populates Artist_Album_Association.artist
    albums = db.relationship('Artist_Album_Association',
                          order_by=Artist_Album_Association.id, backref='artist')

    # db.relationship to tracks table
    # Auto-populates Track.artist
    tracks = db.relationship('Track',
                          order_by=Track.popularity, backref='artist', foreign_keys=[])

    def __init__(self, name, image_url, country, decade, genre):
        assert (name != "")
        assert (image_url != "")
        assert (country != "")
        assert (decade != "")
        assert (genre != "")

        self.name = name
        self.image_url = image_url
        self.country = country
        self.decade = decade
        self.genre = genre

    def __repr__(self):
        return "<Artist(name='%s')>" % (self.name)


class Album(db.Model):
    __tablename__ = 'albums'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    genre = db.Column(db.String(50)) #db.Column(db.String(100))
    release_date = db.Column(db.String(15))
    album_cover_url = db.Column(db.String(200))
    label = db.Column(db.String(100))
    number_of_tracks = db.Column(db.Integer, nullable=True)
    spotify_uri = db.Column(db.String(100))

    # db.relationship to artist_album_pairs table
    # Auto-populates Artist_Album_Association.album
    artists = db.relationship('Artist_Album_Association',
                           order_by=Artist_Album_Association.id, backref='album')

    # db.relationship to tracks table
    # Auto-populates Track.album
    tracks = db.relationship('Track',
                          order_by=Track.popularity, backref='album')

    def __init__(self, name, genre, release_date, album_cover_url, label, number_of_tracks, spotify_uri):
        assert (name != "")
        assert (genre != "")
        assert (release_date != "")
        assert (album_cover_url != "")
        assert (label != "")
        assert (number_of_tracks > 0)
        assert (spotify_uri != "")

        self.name = name
        self.genre = genre
        self.release_date = release_date
        self.album_cover_url = album_cover_url
        self.label = label
        self.number_of_tracks = number_of_tracks
        self.spotify_uri = spotify_uri

    def __repr__(self):
        return "<Album(name='%s', label=%s)>" % (self.name, self.label)

class Concert(db.Model):
    __tablename__ = 'concerts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    event_link = db.Column(db.String(200))
    date = db.Column(db.String(15))
    time = db.Column(db.String(10))

    # Reference to venues table
    # Auto-populates Venue.concerts
    venue_id = db.Column(db.Integer, db.ForeignKey('venues.id'))

    # db.relationship to artist_album_pairs table
    # Auto-populates Concert_AA_Association.concert
    artist_album_pairs = db.relationship('Concert_AA_Association',
                                      order_by=Concert_AA_Association.id, backref='concert')

    def __init__(self, name, event_link, date, time):
        assert (name != "")
        assert (event_link != "")
        assert (date != "")
        assert (time != "")

        self.name = name
        self.event_link = event_link
        self.date = date
        self.time = time

    def __repr__(self):
        return "<Concert(name='%s')>" % (self.name)


class Venue(db.Model):
    __tablename__ = 'venues'

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

    def __init__(self, name, city, region, country, latitude, longitude):
        assert (name != "")
        assert (city != "")
        assert (country != "")

        self.name = name
        self.city = city
        self.region = region
        self.country = country
        self.latitude = latitude
        self.longitude = longitude

    def __repr__(self):
        return "<Venue(name='%s', city='%s')>" % (self.name, self.city)

# Create the tables
db.create_all()
# db.reflect()
# db.drop_all()
db.session.commit()

