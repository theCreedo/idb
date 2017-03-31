#!python
from models import db, Track, Artist, Album, Artist_Album_Association, Concert, Concert_AA_Association, Venue

track = Track('name', 'genre', 'release', 1, 1, 'url', True)
artist = Artist('name', 'url', 'country', 'decade', 'genre')
album = Album('name', 'genre', 'release', 'url', 'label')

artist.tracks.append(track)
album.tracks.append(track)

concert = Concert('name', 'link', 'date', 'time')
venue = Venue('name', 'url', 'city', 'region', 'country', 0.0, 0.0)

venue.concerts.append(concert)

db.session.add(track)
db.session.add(artist)
db.session.add(album)
db.session.add(concert)
db.session.add(venue)

db.session.commit()

