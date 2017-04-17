#!python
from models import db, Track, Artist, Album, Concert, Venue
import json, requests

auth = "BQAC0kN0ZSRW2lSRI7YXMKgPPc4S6kxeqKTpQVqAdXPCVMDvDem8dermo87D8cEtaggmEgzzzzLcSMcBQAC0kN0ZSRW2lSRI7YXMKgPPc4S6kxeqKTpQVqAdXPCVMDvDem8dermo87D8cEtaggmEgzzzzLcSMc-1rTji1L8SZNxDVLaPR-iV1HNvlo5JIEv_4NL4PSrdQ3KHz1kAUD6xP4HJQpU1jVu39eIzNWDJgSxKzKJ9W8"

def decoder(spotify_album, artist_exists):
 	# ALBUM MAKING
	album = album_decoder(spotify_album)
	list_tracks = spotify_album['tracks']['items']
	tracks = []

	# ARTIST MAKING
	if artist_exists:
		artist = artist_exists
		concerts = None
	else:
		# Get from array of artists, just the first artist...?
		art = spotify_album['artists'][0]
		artist = artist_decoder(art, album)

		# CONCERT MAKING
		r = requests.get("https://rest.bandsintown.com/artists/" + artist.name + "/events?app_id=boswemianrhapsody")
		list_concerts = json.loads(r.text)
		concerts = []
		for c in list_concerts:
			try :
				concert = concert_decoder(c, artist.name)
				concerts.append(concert)
			except :
				pass

	# TRACK MAKING
	for t in list_tracks:
		track = track_decoder(t, album)
		tracks.append(track)



	return {'tracks':tracks, 'artist':artist, 'album':album, 'concerts':concerts}

def track_decoder(t, album):
	# explicit = True if t['explicit'] == 'true' else False
	# need to get genre and release date from album
	# need to get url from external URL object

	spotify_track = requests.get(t['href'])
	t = json.loads(spotify_track.text)

	track = Track(t['name'], album.genre, album.release_date, t['duration_ms'], 
		t['popularity'], t['preview_url'], t['explicit'], t['uri'])
	return track

def artist_decoder(art, album):
	assert art != None
	assert (art['type'] == "artist")
	# need to get from simplified to full album objects
	r = requests.get(art['href'])
	full = json.loads(r.text)
	r2 = requests.get("http://api.musicgraph.com/api/v2/artist/search?api_key=7f2f846f462aa5434858477e5957113f&name=" + full['name'])
	mg = json.loads(r2.text)


	# need to get image url from array of image objects
	# need to get country/decade from another api
	mg_data = mg['data']
	country = None
	decade = None
	image = None

	# Grab genre for album from the aritst in music graph
	try :
		genre = mg_data[0]['main_genre']
	except :
		genre = "Unavailable"
	album.genre = genre

	try :
		country = mg_data[0]['country_of_origin']
	except :
		country = "Unavailable"

	try :
		decade = mg_data[0]['decade']
	except :
		decade = "Unavailable"

	try :
		image = full['images'][0]['url']
	except :
		image = None
	artist = Artist(full['name'], image, country, decade, genre)
	return artist

def album_decoder(a):
	# assert (a['album_type'] == "album")
	# Should we do array of genres or just 1 genre...?
	try :
		genre = a['genres'][0]
	except:
		genre = "Unavailable"
	# genre = full['genres'] # IF WE DO A LIST OF GENRES

	# need to get image url from array of image objects
	album = Album(a['name'], genre, a['release_date'] , a['images'][0]['url'], a['label'], a['tracks']['total'], a['uri'])
	return album

def concert_decoder(c, a_name):
	url = None
	date = None
	time = None
	try :
		url = c['url']
	except :
		url = None
	try :
		date = c['datetime'][0:10]
	except :
		date = "Unavailable"
	try :
		time = c['datetime'][11:]
	except :
		time = "Unavailable"
	concert = Concert(a_name, url, date, time)

	#check if its already there
	venue = db.session.query(Venue).filter_by(name=c['venue']['name']).first()
	if not venue:
		venue = venue_decoder(c['venue'])
		db.session.add(venue)
	
	venue.concerts.append(concert)
	db.session.commit()

	return concert

def venue_decoder(v):
	venue = Venue(v['name'], v['city'], v['region'], v['country'], float(v['latitude']), float(v['longitude']))
	return venue

def page_decoder(page):
	items = page['items']
	assert len(items) > 0
	count = 0
	for obj in items:
		print(count)
		count += 1
		href = obj['track']['album']['href']
		req = requests.get(href)
		album_full = json.loads(req.text)

		#check if album already exists
		# album_exists = db.session.query(Album).filter(Album.name == album_full['name']).filter(Album.artists[0].name == album_full['artist']['name']).first()
		album_exists = db.session.query(Album).filter(Album.name == album_full['name']).first()
		if album_exists:
			continue
		artist_exists = db.session.query(Artist).filter_by(name=album_full['artists'][0]['name']).first()

		elements = decoder(album_full, artist_exists)
		tracks = elements['tracks'] 	
		artist = elements['artist']
		album = elements['album']
		concerts = elements['concerts']

		for t in tracks:
			artist.tracks.append(t)
			album.tracks.append(t)
			t.genre = artist.genre

		artist.albums.append(album)
		album.artist = artist
		album.genre = artist.genre

		if not artist_exists:
			for c in concerts:
				album.concerts.append(c)
				artist.concerts.append(c)
				c.album = album
				c.artist = artist
			db.session.add_all(concerts)
			db.session.add(artist)
			
		db.session.add_all(tracks)
		db.session.add(album)
		db.session.commit()


def main():
	# db.session.query(Track).delete()
	# db.session.query(Concert_AA_Association).delete()
	# db.session.query(Artist_Album_Association).delete()
	# db.session.query(Album).delete()
	# db.session.query(Artist).delete()
	# db.session.query(Concert).delete()
	# db.session.query(Venue).delete()

	url = "https://api.spotify.com/v1/users/signalgolfer/playlists/3kCH95laSLbxGPSOoOuxtg"

	headers = {'Authorization' : 'Bearer BQAsFES1TjRX_NFc5dAlvSGpnRiBJETgezwmsSd2-K06ygx249bFkNrCXIuCZGsSXPIk71nK69CmI1DyvjSKfPY-AwkKFQ3VG4yLF-f9IwJceJmI-kPwHWZmwStD6qCDijfhpQGOqIow9yW2-FjW6mNGbs-P1vGjy7c'}

	r = requests.get(url, headers=headers)
	playlist = json.loads(r.text)
	# tracks = playlist['tracks']
	page = playlist['tracks']
	while page:
		page_decoder(page)
		if page["next"]:
			r2 = requests.get(page["next"], headers=headers)
			page = json.loads(r2.text)
		else:
			page = None

	
if __name__ == "__main__" : main()
