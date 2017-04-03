#!python
from models import db, Track, Artist, Album, Artist_Album_Association, Concert, Concert_AA_Association, Venue

# !! Compiling this adds a new track, artist, album, etc. every single time !!
track = Track('name', 'genre', 'release', 1, 1, 'url', True)
artist = Artist('name', 'url', 'country', 'decade', 'genre')
album = Album('name', 'genre', 'release', 'url', 'label')
aa = Artist_Album_Association()
c_aa = Concert_AA_Association()

artist.tracks.append(track)
album.tracks.append(track)

# instead of adding the album directly, it will add an aa
artist.albums.append(aa)
# instead of adding the artist directly, it will add an aa 
album.artists.append(aa)


concert = Concert('name', 'link', 'date', 'time')
venue = Venue('name', 'url', 'city', 'region', 'country', 0.0, 0.0)

venue.concerts.append(concert)
concert.artist_album_pairs.append(c_aa)
aa.concerts.append(c_aa)

# Sample song, artist, and album to make it easier to check that relationships work

# track = Track('Billie Jean', 'Pop', '1-2-1983', 294000, 100, 
# 	'https://open.spotify.com/track/7J1uxwnxfQLu4APicE5Rnj', False)
# artist = Artist('Michael Jackson', 
# 	'https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm', 'United States of America',
# 	 '80s', 'Pop')
# album = Album('Thriller', 'Pop', '11-30-1982', 
# 	'https://open.spotify.com/album/2ANVost0y2y52ema1E9xAZ', 'Epic')
# aa = Artist_Album_Association()
# c_aa = Concert_AA_Association()

# artist.tracks.append(track)
# album.tracks.append(track)

# # instead of adding the album directly, it will add an aa
# artist.albums.append(aa)
# # instead of adding the artist directly, it will add an aa 
# album.artists.append(aa)


# concert = Concert('Bad', 'link', '9-12-1987', 'time')
# venue = Venue('Reunion Arena', 'url', 'Dallas', 'region', 'United States of America', 0.0, 0.0)

# venue.concerts.append(concert)
# concert.artist_album_pairs.append(c_aa)
# aa.concerts.append(c_aa)

db.session.add(track)
db.session.add(artist)
db.session.add(album)
db.session.add(concert)
db.session.add(venue)

db.session.commit()

