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
    name = db.Column(db.String(50))
    genre = db.Column(db.String(25))
    release_date = db.Column(db.String(15))
    duration = db.Column(db.Integer)
    popularity = db.Column(db.Integer)
    preview_url = db.Column(db.String(150))
    explicit = db.Column(db.Boolean)

    # Reference to artists table
    # Auto-populates Artist.tracks
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))

    # Reference to albums table
    # Auto-populates Album.tracks
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'))

    def __init__(self, name, genre, release_date, duration,
                 popularity, preview_url, explicit, artist_id, album_id):
        assert (name != "")
        assert (genre != "")
        assert (release_date != "")
        assert (duration > 0)
        assert (popularity >= 0 and popularity <= 100)
        assert (preview_url != "")
        assert (explicit != "")
        # assert (artist_id > 0)
        # assert (album_id > 0)

        self.name = name
        self.genre = genre
        self.release_date = release_date
        self.duration = duration
        self.popularity = popularity
        self.preview_url = preview_url
        self.explicit = explicit
        self.artist_id = artist_id
        self.album_id = album_id

    def __repr__(self):
        return "<Track(name='%s', artist='%s')>" % (self.name, self.artist.name)

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

    def __init__(artist_id, album_id):
        assert (artist_id > 0)
        assert (album_id > 0)

        self.artist_id = artist_id
        self.album_id = album_id

    def __repr__(self):
        return "<Artist_Album_Association(artist='%s', album='%s')>" %\
            (self.artist.name, self.album.name)


class Artist(db.Model):
    __tablename__ = 'artists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    image_url = db.Column(db.String(150))
    country = db.Column(db.String(50))
    decade = db.Column(db.String(50))
    genre = db.Column(db.String(100))

    # Reference to an artist's most popular track
    most_popular_track_id = db.Column(db.Integer, db.ForeignKey('tracks.id'))
    most_popular_track = db.relationship('Track')

    # db.relationship to artist_album_pairs table
    # Auto-populates Artist_Album_Association.artist
    albums = db.relationship('Artist_Album_Association',
                          order_by=Artist_Album_Association.id, backref='artist')

    # db.relationship to tracks table
    # Auto-populates Track.artist
    tracks = db.relationship('Track',
                          order_by=Track.id, backref='artist')

    def __init__(self, name, image_url, country, decade, genre, most_popular_track_id):
        assert (name != "")
        assert (image_url != "")
        assert (country != "")
        assert (decade != "")
        assert (genre != "")
        assert (most_popular_track > 0)

        self.name = name
        self.image_url = image_url
        self.country = self.country
        self.decade = self.decade
        self.genre = genre
        self.most_popular_track_id = most_popular_track_id

    def __repr__(self):
        return "<Artist(name='%s')>" % (self.name)


class Album(db.Model):
    __tablename__ = 'albums'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    genre = db.Column(db.String(100))
    release_date = db.Column(db.String(15))
    album_cover_url = db.Column(db.String(150))
    label = db.Column(db.String(50))
    number_of_tracks = db.Column(db.Integer)

    # db.relationship to artist_album_pairs table
    # Auto-populates Artist_Album_Association.album
    artists = db.relationship('Artist_Album_Association',
                           order_by=Artist_Album_Association.id, backref='album')

    # db.relationship to tracks table
    # Auto-populates Track.album
    tracks = db.relationship('Track',
                          order_by=Track.id, backref='album')

    def __init__(self, name, genre, release_date, album_cover_url, label, number_of_tracks):
        assert (name != "")
        assert (genre != "")
        assert (release_date != "")
        assert (album_cover_url != "")
        assert (label != "")
        assert (number_of_tracks > 0)

        self.name = name
        self.genre = genre
        self.release_date = release_date
        self.album_cover_url = album_cover_url
        self.label = label
        self.number_of_tracks = number_of_tracks

    def __repr__(self):
        return "<Album(name='%s', label=%s)>" % (self.name, self.label)

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

    def __init__(concert_id, aa_id):
        assert (concert_id > 0)
        assert (aa_id > 0)

        self.concert_id = concert_id
        self.aa_id = aa_id

    def __repr__(self):
        return "<Concert_AA_Association(concert='%s', artist='%s', album='%s'\
            )>" % (self.concert.name, self.artist_album.artist.name,
            self.artist_album.album.name)


class Concert(db.Model):
    __tablename__ = 'concerts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    event_link = db.Column(db.String(150))
    date = db.Column(db.String(15))
    time = db.Column(db.String(10))

    # Reference to venues table
    # Auto-populates Venue.concerts
    venue_id = db.Column(db.Integer, db.ForeignKey('venues.id'))

    # db.relationship to artist_album_pairs table
    # Auto-populates Concert_AA_Association.concert
    artist_album_pairs = db.relationship('Concert_AA_Association',
                                      order_by=Concert_AA_Association.id, backref='concert')

    def __init__(self, name, event_link, date, time, venue_id):
        assert (name != "")
        assert (genre != "")
        assert (event_link != "")
        assert (date != "")
        assert (time != "")
        assert (venue_id > 0)

        self.name = name
        self.genre = genre
        self.event_link = event_link
        self.date = date
        self.time = time
        self.venue_id = venue_id

    def __repr__(self):
        return "<Concert(name='%s')>" % (self.name)


class Venue(db.Model):
    __tablename__ = 'venues'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    image_url = db.Column(db.String(150))
    city = db.Column(db.String(50))
    region = db.Column(db.String(50))
    country = db.Column(db.String(50))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    # db.relationship with concerts table
    # Auto-populates Concert.venue
    concerts = db.relationship('Concert', backref='venue')

    def __init__(self, name, image_url, city, region, country, latitude, longitude):
        assert (name != "")
        assert (image_url != "")
        assert (city != "")
        assert (region != "")
        assert (country != "")
        assert (latitude >= 0.0)
        assert (longitude >= 0.0)

        self.name = name
        self.image_url = image_url
        self.city = city
        self.region = region
        self.country = country
        self.latitude = latitude
        self.longitude = longitude

    def __repr__(self):
        return "<Venue(name='%s', city='%s')>" % (self.name, self.city)

# # Create the tables
# db.create_all()