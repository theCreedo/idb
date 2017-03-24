#! python
from sqlalchemy import create_engine, Column, ForeignKey,\
	Integer, Boolean, Table, Float, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

# SQLAlchemy Declarative Base
Base = declarative_base()

class Track(Base) :
	__tablename__ = 'tracks'
	
	id = Column(Integer, primary_key=True)
	name = Column(String(50))
	genre = Column(String(25))
	release_date = Column(String(15))
	duration = Column(Integer)
	popularity = Column(Integer)
	preview_url = Column(String(150))
	explicit = Column(Boolean)

	# Reference to artists table 
	# Auto-populates Artist.tracks
	artist_id = Column(Integer, ForeignKey('artists.id'))
	artist = relationship('Artist', back_populates='tracks')
	
	# Reference to albums table
	# Auto-populates Album.tracks
	album_id = Column(Integer, ForeignKey('albums.id'))
	album = relationship('Album', back_populates='tracks')

	def __init__(self, name, genre, release_date, duration, 
		popularity, preview_url, explicit, artist_id, album_id):
		assert (name != "")
		assert (genre != "")
		assert (release_date != "")
		assert (duration > 0)
		assert (popularity >= 0 and popularity <= 100)
		assert (preview_url != "")
		assert (explicit != "")
		assert (artist_id > 0)
		assert (album_id > 0)

        self.name = name
        self.genre = genre
        self.release_date = release_date
        self.duration = duration
        self.popularity = popularity
        self.preview_url = preview_url
        self.explicit = explicit
        self.artist_id = artist_id
        self.album_id = album_id


	def __repr__(self) :
		return "<Track(name='%s', artist='%s')>" % (self.name, self.artist.name)

# Association Class to model the many-to-many relationship between 
# Artists and Albums
class Artist_Album_Association(Base) :
	__tablename__ = 'artist_album_pairs'

	id = Column(Integer, primary_key=True)

	# Reference to artists table
	# Auto-populates Artist.albums
	artist_id = Column(Integer, ForeignKey('artists.id'))
	artist = relationship('Artist', back_populates='albums')

	# Reference to albums table
	# Auto-populates Album.artists
	album_id = Column(Integer, ForeignKey('albums.id'))
	album = relationship('Album', back_populates='artists')

	def __init__(artist_id, album_id):
		assert (artist_id > 0)
		assert (album_id > 0)

        self.artist_id = artist_id
        self.album_id = album_id

	def __repr__(self) :
		return "<Artist_Album_Association(artist='%s', album='%s')>" %\
			(self.artist.name, self.album.name)

class Artist(Base) :
	__tablename__ = 'artists'

	id = Column(Integer, primary_key=True)
	name = Column(String(50))
	image_url = Column(String(150))
	country = Column(String(50))
	decade = Column(String(50))
	genre = Column(String(100))

	# Reference to an artist's most popular track
	most_popular_track_id = Column(Integer, ForeignKey('tracks.id'))
	most_popular_track = relationship('Track')

	# Relationship to artist_album_pairs table 
	# Auto-populates Artist_Album_Association.artist
	albums = relationship('Artist_Album_Association', 
		order_by=Artist_Album_Association.id, back_populates='artist')

	# Relationship to tracks table
	# Auto-populates Track.artist
	tracks = relationship('Track', 
		order_by=Track.id, back_populates='artist')

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

	def __repr__(self) :
		return "<Artist(name='%s')>" % (self.name)

class Album(Base) :
	__tablename__ = 'albums'

	id = Column(Integer, primary_key=True)
	name = Column(String(50))
	genre = Column(String(100))
	release_date = Column(String(15))
	album_cover_url = Column(String(150))
	label = Column(String(50))
	number_of_tracks = Column(Integer)

	# Relationship to artist_album_pairs table
	# Auto-populates Artist_Album_Association.album
	artists = relationship('Artist_Album_Association',
		order_by=Artist_Album_Association.id, back_populates='album')

	# Relationship to tracks table
	# Auto-populates Track.album
	tracks = relationship('Track', 
		order_by=Track.id, back_populates='album')

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

	def __repr__(self) :
		return "<Album(name='%s', label=%s)>" % (self.name, self.label)

# Association class to model the many-to-many relationship between
# Concerts and Artists and Albums
class Concert_AA_Association(Base) :
	__tablename__ = 'concert_aa_pairs'

	id = Column(Integer, primary_key=True)

	# Reference to concerts table
	# Auto-populates Concert.artist_album_pairs
	concert_id = Column(Integer, ForeignKey('concerts.id'))
	concert = relationship('Concert', 
		back_populates='artist_album_pairs')

	# Reference to artist_album_pairs table
	aa_id = Column(Integer, ForeignKey('artist_album_pairs.id'))
	artist_album = relationship('Artist_Album_Association')


	def __init__(concert_id, aa_id):
		assert (concert_id > 0)
		assert (aa_id > 0)

        self.concert_id = concert_id
        self.aa_id = aa_id


	def __repr__(self) :
		return "<Concert_AA_Association(concert='%s', artist='%s', album='%s'\
			)>" % (self.concert.name, self.artist_album.artist.name,
			self.artist_album.album.name)

class Concert(Base) :
	__tablename__ = 'concerts'

	id = Column(Integer, primary_key=True)
	name = Column(String(50))
	event_link = Column(String(150))
	date = Column(String(15))
	time = Column(String(10))

	# Reference to venues table
	# Auto-populates Venue.concerts
	venue_id = Column(Integer, ForeignKey('venues.id'))
	venue = relationship('Venue', back_populates='concerts')

	# Relationship to artist_album_pairs table
	# Auto-populates Concert_AA_Association.concert
	artist_album_pairs = relationship('Concert_AA_Association',
		order_by=Concert_AA_Association.id, back_populates='concert')

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

	def __repr__(self) :
		return "<Concert(name='%s')>" % (self.name)

class Venue(Base) :
	__tablename__ = 'venues'

	id = Column(Integer, primary_key=True)
	name = Column(String(50))
	image_url = Column(String(150))
	city = Column(String(50))
	region = Column(String(50))
	country = Column(String(50))
	latitude = Column(Float)
	longitude = Column(Float)

	# Relationship with concerts table
	# Auto-populates Concert.venue
	concerts = relationship('Concert', back_populates='venue')

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

	def __repr__(self) :
		return "<Venue(name='%s', city='%s')>" % (self.name, self.city)

# SQLAlchemy's connection to database
# See SQLAlchemy's documation on PostgreSQL format
# Commented out for Phase 1 
# engine = create_engine('POSTGRES_DB_HERE')

# Create tables in database from classes
# Base.metadata.create_all(engine)

