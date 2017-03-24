# """
# models.py

# App Engine datastore models

# """


from google.appengine.ext import ndb


class ExampleModel(ndb.Model):
    """Example Model"""
    example_name = ndb.StringProperty(required=True)
    example_description = ndb.TextProperty(required=True)
    added_by = ndb.UserProperty()
    timestamp = ndb.DateTimeProperty(auto_now_add=True)


# #! python
# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import create_engine, Column, ForeignKey,\
# 	Integer, Boolean, Key, Table, Float
# from sqlalchemy.orm import relationship
# from sqlalchemy.ext.declarative import declarative_base

# # SQLAlchemy Declarative Base
# Base = declarative_base()

# class Track(ndb.Model) :
# 	__tablename__ = 'tracks'
	
# 	id = ndb.IntegerProperty(required=True) #look into making this a primary key
# 	name = ndb.StringProperty(required=True)
# 	genre = ndb.StringProperty(required=True)
# 	release_date = ndb.StringProperty(required=True)
# 	duration = ndb.IntegerProperty(required=True)
# 	popularity = ndb.IntegerProperty(required=True)
# 	preview_url = ndb.StringProperty(required=True)
# 	explicit = ndb.BooleanProperty(required=True)

# 	# Reference to artists table 
# 	# Auto-populates Artist.tracks
# 	artist_id = Column(Integer, ForeignKey('artists.id'))
# 	artist = relationship('Artist', back_populates='tracks')
	
# 	# Reference to albums table
# 	# Auto-populates Album.tracks
# 	album_id = Column(Integer, ForeignKey('albums.id'))
# 	album = relationship('Album', back_populates='tracks')

# 	def __repr__(self) :
# 		return "<Track(name='%s', artist='%s')>" % (self.name, self.artist.name)

# class Artist(Base) :
# 	__tablename__ = 'artists'

# 	id = ndb.IntegerProperty(required=True)
# 	name = ndb.StringProperty(required=True)
# 	image_url = ndb.StringProperty(required=True)
# 	country = ndb.StringProperty(required=True)
# 	decade = ndb.StringProperty(required=True)
# 	genre = ndb.StringProperty(required=True)

# 	# Reference to an artist's most popular track
# 	most_popular_track_id = Column(Integer, ForeignKey('tracks.id'))
# 	most_popular_track = relationship('Track')

# 	# Relationship to artist_album_pairs table 
# 	# Auto-populates Artist_Album_Association.artist
# 	albums = relationship('Artist_Album_Association', 
# 		order_by=Artist_Album_Association.id, back_populates='artist')

# 	# Relationship to tracks table
# 	# Auto-populates Track.artist
# 	tracks = relationship('Track', 
# 		order_by=Track.id, back_populates='artist')

# 	def __repr__(self) :
# 		return "<Artist(name='%s')>" % (self.name)

# class Album(Base) :
# 	__tablename__ = 'albums'

# 	id = ndb.IntegerProperty(required=True)
# 	name = ndb.StringProperty(required=True)
# 	genre = ndb.StringProperty(required=True)
# 	release_date = ndb.StringProperty(required=True)
# 	album_cover_url = ndb.StringProperty(required=True)
# 	label = ndb.StringProperty(required=True)
# 	number_of_tracks = ndb.IntegerProperty(required=True)

# 	# Relationship to artist_album_pairs table
# 	# Auto-populates Artist_Album_Association.album
# 	artists = relationship('Artist_Album_Association',
# 		order_by=Artist_Album_Association.id, back_populates='album')

# 	# Relationship to tracks table
# 	# Auto-populates Track.album
# 	tracks = relationship('Track', 
# 		order_by=Track.id, back_populates='album')

# 	def __repr__(self) :
# 		return "<Album(name='%s', label=%s)>" % (self.name, self.label)

# # Association Class to model the many-to-many relationship between 
# # Artists and Albums
# class Artist_Album_Association(Base) :
# 	__tablename__ = artist_album_pairs

# 	id = ndb.IntegerProperty(required=True)

# 	# Reference to artists table
# 	# Auto-populates Artist.albums
# 	artist_id = Column(Integer, ForeignKey('artists.id'))
# 	artist = relationship('Artist', back_populates='albums')

# 	# Reference to albums table
# 	# Auto-populates Album.artists
# 	album_id = Column(Integer, ForeignKey('albums.id'))
# 	album = relationship('Album', back_populates='artists')

# 	def __repr__(self) :
# 		return "<Artist_Album_Association(artist='%s', album='%s')>" % (self.artist.name, self.album.name)

# class Concert(Base) :
# 	__tablename__ = 'concerts'

# 	id = ndb.IntegerProperty(required=True)
# 	name = ndb.StringProperty(required=True)
# 	event_link = ndb.StringProperty(required=True)
# 	date = ndb.StringProperty(required=True)
# 	time = ndb.StringProperty(required=True)

# 	# Reference to venues table
# 	# Auto-populates Venue.concerts
# 	venue_id = Column(Integer, ForeignKey('venues.id'))
# 	venue = relationship('Venue', back_populates='concerts')

# 	# Relationship to artist_album_pairs table
# 	# Auto-populates Concert_AA_Association.concert
# 	artist_album_pairs = relationship('Concert_AA_Association',
# 		order_by=Concert_AA_Association.id, back_populates='concert')

# 	def __repr__(self) :
# 		return "<Concert(name='%s')>" % (self.name)

# # Association class to model the many-to-many relationship between
# # Concerts and Artists and Albums
# class Concert_AA_Association(Base) :
# 	__tablename__ = 'concert_aa_pairs'

# 	id = ndb.IntegerProperty(required=True)

# 	# Reference to concerts table
# 	# Auto-populates Concert.artist_album_pairs
# 	concert_id = Column(Integer, ForeignKey('concerts.id'))
# 	concert = relationship('Concert', 
# 		back_populates='artist_album_pairs')

# 	# Reference to artist_album_pairs table
# 	aa_id = Column(Integer, ForeignKey('artist_album_pairs.id'))
# 	artist_album = relationship('Artist_Album_Association')

# 	def __repr__(self) :
# 		return "<Concert_AA_Association(concert='%s', artist='%s', album='%s'\
# 			)>" % (self.concert.name, self.artist_album.artist.name,
# 			self.artist_album.album.name)

# class Venue(Base) :
# 	__tablename__ = 'venues'

# 	id = ndb.IntegerProperty(required=True)
# 	name = ndb.StringProperty(required=True)
# 	image_url = ndb.StringProperty(required=True)
# 	city = ndb.StringProperty(required=True)
# 	region = ndb.StringProperty(required=True)
# 	country = ndb.StringProperty(required=True)
# 	latitude = ndb.FloatProperty(required=True)
# 	longitude = ndb.FloatProperty(required=True)

# 	# Relationship with concerts table
# 	# Auto-populates Concert.venue
# 	concerts = relationship('Concert', back_populates='venue')

# 	def __repr__(self) :
# 		return "<Venue(name='%s', city='%s')>" % (self.name, self.city)

# # SQLAlchemy's connection to database
# # See SQLAlchemy's documation on PostgreSQL format
# engine = create_engine('POSTGRESQL_DATABASE_HERE')

# # Create tables in database from classes
# Base.metadata.create_all(engine)
