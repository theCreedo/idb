from models import db, Venue, Concert, Album, Artist, Track
import json
import whoosh 

# once again not sure how to get the input, so for now will pretend it's from stdin
q = str(input())

trackAnd = Track.query.whooshee_search(q, group=whoosh.qparser.syntax.AndGroup, order_by_relevance=-1, match_substrings=False).all()
artistAnd = Artist.query.whooshee_search(q, group=whoosh.qparser.syntax.AndGroup, order_by_relevance=-1, match_substrings=False).all()
albumAnd = Album.query.whooshee_search(q, group=whoosh.qparser.syntax.AndGroup, order_by_relevance=-1, match_substrings=False).all()
concertAnd = Concert.query.whooshee_search(q, group=whoosh.qparser.syntax.AndGroup, order_by_relevance=-1, match_substrings=False).all()

trackOr = Track.query.whooshee_search(q, group=whoosh.qparser.syntax.OrGroup, order_by_relevance=-1, match_substrings=False).all()
trackOrOnly = [item for item in trackOr if item not in trackAnd]
artistOr = Artist.query.whooshee_search(q, group=whoosh.qparser.syntax.OrGroup, order_by_relevance=-1, match_substrings=False).all()
artistOrOnly = [item for item in artistOr if item not in artistAnd]
albumOr = Album.query.whooshee_search(q, group=whoosh.qparser.syntax.OrGroup, order_by_relevance=-1, match_substrings=False).all()
albumOrOnly = [item for item in albumOr if item not in albumAnd]
concertOr = Concert.query.whooshee_search(q, group=whoosh.qparser.syntax.OrGroup, order_by_relevance=-1, match_substrings=False).all()
concertOrOnly = [item for item in concertOr if item not in concertAnd]


# num_results = len(trackAnd) + len(artistAnd) + len(albumAnd) + len(concertAnd) 
# + len(trackOrOnly) + len(artistOrOnly) + len(albumOrOnly) + len(concertOrOnly) 
jsonDict = {'num_results':0, 'results':[]}
maxLen = max(len(trackAnd), len(artistAnd), len(albumAnd), len(concertAnd))

# Add in all the 'and' matches
for i in range(maxLen):
	if i < len(trackAnd):
		t = trackAnd[i]
		tDict = dict()
		tDict['type'] = 'track'
		tDict['data'] = {'id':t.id,'name':t.name, 'genre':t.genre, 
			'release_date':t.release_date, 'duration':t.duration, 'popularity':t.popularity,
			'preview_url':t.preview_url, 'explicit':t.explicit, 'spotify_uri':t.spotify_uri,
			'artist_id':t.artist_id, 'album_id':t.album_id}
		jsonDict['results'].append(tDict)
	if i < len(artistAnd):
		art = artistAnd[i]
		artDict = dict()
		artDict['type'] = 'artist'
		artDict['data'] = {'id':art.id,'name':art.name, 'image_url':art.image_url, 'country':art.country,
		 'decade':art.decade,'genre':art.genre}
		jsonDict['results'].append(artDict)
	if i < len(albumAnd):
		a = albumAnd[i]
		aDict = dict()
		aDict['type'] = 'album'
		aDict['data'] = {'id':a.id,'name':a.name, 'genre':a.genre, 
			'release_date':a.release_date, 'album_cover_url':a.album_cover_url,
			'label':a.label, 'number_of_tracks':a.number_of_tracks,'spotify_uri':a.spotify_uri,
			'artist_id':a.artist_id}
		jsonDict['results'].append(aDict)
	if i < len(concertAnd):
		c = concertAnd[i]
		cDict = dict()
		cDict['type'] = 'concert'
		cDict['data'] = {'id':c.id,'name':c.name, 'event_link':c.event_link, 'date':c.date, 'time':c.time}
		jsonDict['results'].append(cDict)

# Add in all the 'or-only' matches
maxLen = max(len(trackOrOnly), len(albumOrOnly), len(albumOrOnly), len(concertOrOnly))
for i in range(maxLen):
	if i < len(trackOrOnly):
		t = trackOrOnly[i]
		tDict = dict()
		tDict['type'] = 'track'
		tDict['data'] = {'id':t.id,'name':t.name, 'genre':t.genre, 
			'release_date':t.release_date, 'duration':t.duration, 'popularity':t.popularity,
			'preview_url':t.preview_url, 'explicit':t.explicit, 'spotify_uri':t.spotify_uri,
			'artist_id':t.artist_id, 'album_id':t.album_id}
		jsonDict['results'].append(tDict)
	if i < len(artistOrOnly):
		art = artistOrOnly[i]
		artDict = dict()
		artDict['type'] = 'artist'
		artDict['data'] = {'id':art.id,'name':art.name, 'image_url':art.image_url, 'country':art.country,
		 'decade':art.decade,'genre':art.genre}
		jsonDict['results'].append(artDict)
	if i < len(albumOrOnly):
		a = albumOrOnly[i]
		aDict = dict()
		aDict['type'] = 'album'
		aDict['data'] = {'id':a.id,'name':a.name, 'genre':a.genre, 
			'release_date':a.release_date, 'album_cover_url':a.album_cover_url,
			'label':a.label, 'number_of_tracks':a.number_of_tracks,'spotify_uri':a.spotify_uri,
			'artist_id':a.artist_id}
		jsonDict['results'].append(aDict)
	if i < len(concertOrOnly):
		c = concertOrOnly[i]
		cDict = dict()
		cDict['type'] = 'concert'
		cDict['data'] = {'id':c.id,'name':c.name, 'event_link':c.event_link, 'date':c.date, 'time':c.time}
		jsonDict['results'].append(cDict)

jsonDict['num_results'] = len(jsonDict['results'])
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