#!python
from models import db, Track, Artist, Album, Artist_Album_Association, Concert, Concert_AA_Association, Venue
import json

def track_decoder(t):
 	assert (t['type'] == "track")
 	# exists = db.session.query(db.exists().where(User.name == 'davidism')).scalar()
 	# if exists:

 	# First, grab the album associated with the track so that, we can get the genre and release date
 	a = track['album']
	album = album_decoder(a) 

	explicit = True if t['explicit'] == 'true' else False
	# need to get genre and release date from album
	# need to get url from external URL object
	track = Track(t['name'], a.genre, a.release_date, t['duration_ms'], 
		t['popularity'], t['external_urls']['spotify'], explicit)
	return track

	# Get from array of artists, just the first artist...?
	art = track['artists'][0]
	artist = artist_decoder(art)

	return {'track':track, 'artist':artist, 'album':album}


def artist_decoder(art):
	assert (t['type'] == "artist")
	# need to get from simplified to full album objects
	r = requests.get(art['href'])
	full = json.loads(r.text)

	# Should we do array of genres or just 1 genre...?
	genre = "None" if len(full['genres']) == 0 else full['genres'][0]
	# genre = full['genres'] # IF WE DO A LIST OF GENRES

	# need to get image url from array of image objects
	# need to get country/decade from another api
	artist = Artist(full['name'], full['images'][0]['url'], 'Unknown', 'Unknown', genre)
	return artist

# def artist_decoder_MG(a):


def album_decoder(a):
	assert (t['album_type'] == "album")
	# need to get from simplified to full album objects
	r = requests.get(a['href'])
	full = json.loads(r.text)

	# Should we do array of genres or just 1 genre...?
	genre = "None" if len(full['genres']) == 0 else full['genres'][0]
	# genre = full['genres'] # IF WE DO A LIST OF GENRES

	# need to get image url from array of image objects
	album = Album(full['name'], genre, full['release_date'] , a['images'][0]['url'], a['label'])
	return album


def main():
	for json_file in json_files:
		json_file = #obtained from datascraping
		obj = json.loads(json_file)

		elements = track_decoder(obj)
		track = elements['track']
		artist = elements['artist']
		album = elements['album']
		aa = Artist_Album_Association()
		# c_aa = Concert_AA_Association()
		artist.tracks.append(track)
		album.tracks.append(track)
		artist.albums.append(aa)
		album.artists.append(aa)

		db.session.add(track)
		db.session.add(artist)
		db.session.add(album)
		# db.session.add(concert)
		# db.session.add(venue)

		db.session.commit()






