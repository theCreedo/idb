from models import db, Venue, Concert, Album, Artist, Track
import json

# once again not sure how to get the input, so for now will pretend it's from stdin
q = str(input())

trackQ = Track.query.whooshee_search(q, order_by_relevance=-1).all()
artistQ = Artist.query.whooshee_search(q, order_by_relevance=-1).all()
albumQ = Album.query.whooshee_search(q, order_by_relevance=-1).all()
concertQ = Concert.query.whooshee_search(q, order_by_relevance=-1).all()
# venueQ = Venue.query.whooshee_search(q, order_by_relevance=-1).all()

num_results = len(trackQ) + len(artistQ) + len(albumQ) + len(concertQ) #+ len(venueQ)
jsonDict = {'num_results':num_results, 'results':[]}
maxLen = max(len(trackQ), len(artistQ), len(albumQ), len(concertQ))
for i in range(maxLen):
	if i < len(trackQ):
		t = trackQ[i]
		tDict = dict()
		tDict['type'] = 'track'
		tDict['data'] = {'id':t.id,'name':t.name, 'genre':t.genre, 
			'release_date':t.release_date, 'duration':t.duration, 'popularity':t.popularity,
			'preview_url':t.preview_url, 'explicit':t.explicit, 'spotify_uri':t.spotify_uri,
			'artist_id':t.artist_id, 'album_id':t.album_id}
		jsonDict['results'].append(tDict)
	if i < len(artistQ):
		art = artistQ[i]
		artDict = dict()
		artDict['type'] = 'artist'
		artDict['data'] = {'id':art.id,'name':art.name, 'image_url':art.image_url, 'country':art.country,
		 'decade':art.decade,'genre':art.genre}
		jsonDict['results'].append(artDict)
	if i < len(albumQ):
		a = albumQ[i]
		aDict = dict()
		aDict['type'] = 'album'
		aDict['data'] = {'id':a.id,'name':a.name, 'genre':a.genre, 
			'release_date':a.release_date, 'album_cover_url':a.album_cover_url,
			'label':a.label, 'number_of_tracks':a.number_of_tracks,'spotify_uri':a.spotify_uri,
			'artist_id':a.artist_id}
		jsonDict['results'].append(aDict)
	if i < len(concertQ):
		c = concertQ[i]
		cDict = dict()
		cDict['type'] = 'concert'
		cDict['data'] = {'id':c.id,'name':c.name, 'event_link':c.event_link, 'date':c.date, 'time':c.time}
		jsonDict['results'].append(cDict)

print(json.dumps(jsonDict))

# 
# {
#     num_results:69,
#     results:[
#         {
#             type:artist,
#             data: {...}
#         },
#         	]
# }