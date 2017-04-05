#!python
from models import db, Track, Artist, Album, Artist_Album_Association, Concert, Concert_AA_Association, Venue
import json

def decoder(spotify_album, artist_exists):
 	# First, grab the album associated with the track so that, we can get the genre and release date
	album = album_decoder(spotify_album)
	list_tracks = spotify_album['tracks']['items']
	tracks = []

	for t in list_tracks:
		track = track_decoder(t, album)
		tracks.append(track)

	if artist_exists:
		artist = artist_exists
		concerts = None
	else:
		# Get from array of artists, just the first artist...?
		art = track['artists'][0]
		artist = artist_decoder(art)

		r = requests.get("https://rest.bandsintown.com/artists/" + artist.name + "/events?app_id=boswemianrhapsody")
		list_concerts = json.loads(r.text)
		concerts = []
		for c in list_concerts:
			concert = concert_decode(c, artist.name)
			concerts.append(concert)


	return {'tracks':tracks, 'artist':artist, 'album':album, 'concerts':concerts}

def track_decoder(t, album):
	explicit = True if t['explicit'] == 'true' else False
	# need to get genre and release date from album
	# need to get url from external URL object
	track = Track(t['name'], album.genre, album.release_date, t['duration_ms'], 
		t['popularity'], t['preview_url'], explicit)
	return track

def artist_decoder(art, album):
	assert (t['type'] == "artist")
	# need to get from simplified to full album objects
	r = requests.get(art['href'])
	full = json.loads(r.text)
	r2 = requests.get("http://api.musicgraph.com/api/v2/artist/search?api_key=05037b5542d5f3e47e19dce0a89ca63b&name=" + full['name'])
	mg = json.loads(r2.text)

	# Should we do array of genres or just 1 genre...?
	# genre = full['genres'] # IF WE DO A LIST OF GENRES

	# need to get image url from array of image objects
	# need to get country/decade from another api
	artist = Artist(full['name'], full['images'][0]['url'], mg['country_of_origin'], mg['decade'], album.genre)
	return artist

def album_decoder(a):
	assert (t['album_type'] == "album")
	# Should we do array of genres or just 1 genre...?
	genre = "None" if len(full['genres']) == 0 else full['genres'][0]
	# genre = full['genres'] # IF WE DO A LIST OF GENRES

	# need to get image url from array of image objects
	album = Album(a['name'], genre, a['release_date'] , a['images'][0]['url'], a['label'], a['tracks']['total'])
	return album

def concert_decoder(c, a_name):
	concert = Concert(a_name, c['url'], c['datetime'][0:10], c['datetime'][11:])

	#check if its already there
	venue = db.session.query(Venue).filter_by(name=c['venue']['name']).first()
	if not venue:
		venue = venue_decoder(c['venue'])
		db.session.add(venue)
	
	venue.concerts.append(concert)
	#db.session.commit()

	return concert

def venue_decoder(v):
	venue = Venue(v['name'], None, v['city'], v['region'], v['country'], v['latitude'], v['location'])
	return venue


def __main__():
	db.session.query(Track).delete()
	db.session.query(Album).delete()
	db.session.query(Artist).delete()
	db.session.query(Concert).delete()
	db.session.query(Artist_Album_Association).delete()
	db.session.query(Concert_AA_Association).delete()
	db.session.query(Venue).delete()

	r = requests.get(url, headers=headers)
	playlist = json.loads(r.text)
	tracks = playlist['tracks']
	items = tracks['items']

	for obj in items:
		href = obj['track']['album']['href']
		req = requests.get(href)
		album_full = json.loads(req.text)

		#check if album already exists
		album_exists = db.session.query(Album).filter(Album.name == album_full['name']).filter(Album.arist.name == album_full['artist']['name']).first()
		if album_exists:
			continue
		artist_exists = db.session.query(Artist).filter_by(name=album_full['artists'][0]['name']).first()

		elements = decoder(album_full, artist_exists)
		tracks = elements['tracks']
		artist = elements['artist']
		album = elements['album']
		concerts = elements['concerts']
		aa = Artist_Album_Association()

		for t in tracks:
			artist.tracks.append(t)
			album.tracks.append(t)

		artist.albums.append(aa)
		album.artists.append(aa)

		if not artist_exists:
			for c in concerts:
				c_aa = Concert_AA_Association()
				aa.concerts.append(c_aa)
				concert.artist_album_pairs.append(c_aa)
			db.session.add_all(concerts)
			db.session.add(artist)
			
		# for t in tracks:
		db.session.add_all(tracks)
		db.session.add(album)
		#db.session.commit()






